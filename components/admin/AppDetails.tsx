import { FC, useEffect, useState } from "react";
import { ref, child, get } from "firebase/database";

import AppForm, { AppFormValues } from "@components/apply/AppForm";
import { firebaseDb } from "@utils/firebase";

type Props = {
  id: string;
};

const dbRef = ref(firebaseDb);

const AppDetails: FC<Props> = ({ id }: Props) => {
  const [application, setApplication] = useState<AppFormValues | null>(null);

  useEffect(() => {
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

  return !application ? <></> : <AppForm readOnly values={application} />;
};

export default AppDetails;
