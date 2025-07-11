import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): void {
  if (req.method === "POST") {
    try {
      const { membersData } = req.body;
      const filePath = path.join(process.cwd(), "constants", "members.json");

      // create multiple backups if a backup already exists
      if (fs.existsSync(filePath)) {
        let backupCounter = 1;
        let backupPath = path.join(
          process.cwd(),
          "constants",
          "members_backup.json",
        );

        while (fs.existsSync(backupPath)) {
          backupCounter++;
          backupPath = path.join(
            process.cwd(),
            "constants",
            `members_backup${backupCounter}.json`,
          );
        }

        fs.copyFileSync(filePath, backupPath);
      }

      fs.writeFileSync(filePath, JSON.stringify(membersData, null, 2));

      res.status(200).json({
        message: "File saved successfully to constants/members.json",
      });
    } catch (error) {
      console.error("Error saving file:", error);
      res.status(500).json({
        error: "Failed to save file",
        details: error instanceof Error ? error.message : String(error),
      });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
