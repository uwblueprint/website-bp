import { FC, useEffect, useState } from "react";
import { ref, child, get } from "firebase/database";

import AppForm, { AppFormValues } from "@components/apply/AppForm";
import { fireabseDb } from "@utils/firebase";

type Props = {
  id: string;
};

const dbRef = ref(fireabseDb);

const AppDetails: FC<Props> = ({ id }: Props) => {
  const [application, setApplication] = useState<AppFormValues | null>(null);

  useEffect(() => {
    console.log("id", id);
    get(child(dbRef, `studentApplications/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setApplication(snapshot.val());
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(application);

  return <AppForm readOnly initialValues={application || undefined} />;
};

export default AppDetails;
