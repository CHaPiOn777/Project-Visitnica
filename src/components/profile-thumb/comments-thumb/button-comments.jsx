import { useContext } from 'react';
import { useEffect, useState } from 'react';
import getProfileReactions from '../../../services/utils/api/get-profile-reacitons';
import { AuthContext } from '../../app/app';
import Comment from '../../comment/comment';
import styles from "./button-comments.module.css";

const ButtonComments = ({ user, block }) => {
  const [commentCount, setCommentCount] = useState(0);
  const [commentVisible, setCommentVisible] = useState(false);
  const [comments, setComments] = useState(null);
  const [commentSort, setCommentSort] = useState([]);

  function toggleComments() {
    setCommentVisible((prev) => !prev);
  }
  const {currentUser} = useContext(AuthContext);
  // const user = currentUser;

  useEffect(() => {
    if (user) {
      getProfileReactions({ limit: 0, id: user._id }).then((res) => {
        setComments(res)
        setCommentCount(res.total);
      }).catch((err) => {
        console.error(`Ошибка загрузки комментариев: ${err}`);
      });
    }
  }, []);

  useEffect(() => {
    if (block !== 'undefined') {
      setCommentSort(comments?.items.filter(item => item.target === block))
    } else {
      setCommentSort(comments?.items)
    }
  }, [comments])

  const commentAccessMode = currentUser.role === 'curator' ? 'admin' : 'owner';
  return (
    <>
      <button className={styles['chat-icon']} onClick={toggleComments} type='button'>
        <div className={styles['comment-counter']}>
          {commentSort?.length ?
            (commentSort.length < 100 ? commentSort.length : '99+') : commentCount < 100 ? commentCount : '99+'}
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="27" fill="none"><path fill="#FF00A8" fillRule="evenodd" d="M1.515 25.887a.633.633 0 0 0 .354.113c3.633.04 6.296-.662 7.98-2.19.906.19 1.85.29 2.818.29 6.995 0 12.666-5.246 12.666-11.717 0-6.47-5.67-11.716-12.666-11.716S0 5.912 0 12.383c0 3 1.22 5.737 3.224 7.81-.17 1.693-.791 3.312-1.863 4.854-.2.288-.133.64.154.84Zm8.885-4.662a2.5 2.5 0 0 0-2.194.595c-.67.609-2.089 1.451-3.418 1.706.625-.904.952-2.224 1.048-3.173a2.5 2.5 0 0 0-.69-1.988c-1.595-1.648-2.48-3.748-2.48-5.97 0-4.959 4.436-9.062 10-9.062 5.565 0 10 4.103 10 9.063 0 4.96-4.435 9.062-10 9.062-.77 0-1.53-.079-2.266-.233Z" clipRule="evenodd" /></svg>
      </button>
      <div className={styles['comment-container']}>
        {commentVisible && <Comment target={commentSort} rules={commentAccessMode} userId={user._id} />}
      </div>
    </>
  );
};

export default ButtonComments;