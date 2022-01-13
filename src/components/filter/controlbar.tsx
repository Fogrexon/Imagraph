import { useRouter } from "next/dist/client/router";
import { useContext } from "react";
import { addWork } from "../../lib/firestore"
import { WorkInfo } from "../../lib/types";
import { AuthContext } from "../common/auth";
import { NotificationContext } from "../common/notification";
import { Button } from "../ui/button";

export const ControlBar = ({item} : { item: WorkInfo}) => {
  const { user } = useContext(AuthContext);
  const { dispatchNotification } = useContext(NotificationContext);
  const router = useRouter();
  
  const forkHandler = async () => {
    if(!user) return;
    const addedItemId = (await addWork(user.id, item.detail)).id;
    await dispatchNotification({type: 'info', message: 'フォークしました'})
    router.push(`/edit/${addedItemId}`);
  }
  const copyInsertCode = () => {
    // TODO 埋め込みコード
  }

  return (
    <div className="w-full text-right">
      <Button primary onClick={forkHandler}>Fork</Button>
      <Button onClick={copyInsertCode}>埋め込みコード</Button>
    </div>
  )
}