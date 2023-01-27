import { useEffect, useState } from 'react';
import styles from './comment.module.css';
import closeIcon from '../../images/del.svg';
import smile from '../../images/smiles/smile.svg';
import like from '../../images/smiles/like.svg';
import dislike from '../../images/smiles/dislike.svg';
import heart from '../../images/smiles/heart.svg';
import hand from '../../images/smiles/hand.svg';
import love from '../../images/smiles/love.svg';
import upset from '../../images/smiles/upset.svg';
import fun from '../../images/smiles/fun.svg';
import fear from '../../images/smiles/fear.svg';
import confused from '../../images/smiles/confused.svg';
import { deleteComment, postComment } from '../../services/utils/api/commentApi';
import { setQty } from '../../services/utils/utils';
import { useForm } from '../../hooks/useForm';

// target - ид пользователя, rules: 'admin' | 'owner' | 'user', в зависимости от того,
// кто открывает комменты. Не похоже, что сервак фильтрует по job/hobby/т.д., так что,
// видимо, это надо делать прямо в элементе.
export default function Comment({ target, rules, userId }) {
  // const [ rules, setRules ] = useState('admin');
  const [comments, setComments] = useState(null);
  const [smiles, setSmiles] = useState([
    {
      type: 'like',
      text: '👍',
      img: like,
      qty: 0,
    },
    {
      type: 'dislike',
      text: '👎️',
      img: dislike,
      qty: 0,
    },
    {
      type: 'hand',
      text: '👋️',
      img: hand,
      qty: 0,
    },
    {
      type: 'smile',
      text: '🙂️',
      img: smile,
      qty: 0,
    },
    {
      type: 'upset',
      text: '😞️',
      img: upset,
      qty: 0,
    },
    {
      type: 'fun',
      text: '🤣️',
      img: fun,
      qty: 0,
    },
    {
      type: 'confused',
      text: '😬️',
      img: confused,
      qty: 0,
    },
    {
      type: 'fear',
      text: '😱️',
      img: fear,
      qty: 0,
    },
    {
      type: 'love',
      text: '😍️',
      img: love,
      qty: 0,
    },
    {
      type: 'heart',
      text: '❤️',
      img: heart,
      qty: 0,
    }
  ]);

  const { values, handleChange, setValues } = useForm({ text: '' });
  useEffect(() => {
    if (rules === 'admin' || rules === 'owner') {
      const emotions = target.filter(el => el.emotion);
      setComments(target.filter(el => el.text));
      setSmiles(smiles.map(el => {
        return {
          ...el,
          id: el._id,
          qty: setQty(emotions)[el.type] | 0
        }
      }))
    }
  }, [])

  const handleEmojiClick = (e, el) => {
    const els = document.querySelectorAll(`.${styles.emojiContDefault}`);
    const target = e.currentTarget;

    if (target.classList.contains(styles.emojiCont)) {
      deleteComment(el._id) //выдает 404 из-за неправильной работы сервера (пост запрос выдает 1 при статусе 202)
        .then(() => {
          setSmiles(smiles.map(i => i === el ? { ...i, qty: i.qty - 1 } : i));
          target.classList.remove(styles.emojiCont);
        })
        .catch((err) => {
          console.error(`Ошибка загрузки данных студентов: ${err}`);
        });
    }
    else {
      postComment({ emotion: el.type, target: null }, userId) //работает с айди a18ca3c1e13dd93ddded5bbc, с другим дает ошибку 403
        .then(() => {
          setSmiles(smiles.map(i => i === el ? { ...i, qty: i.qty + 1 } : i));
          target.classList.add(styles.emojiCont);
        })
        .catch((err) => {
          console.error(`Ошибка загрузки данных студентов: ${err}`);
        });
    }

    els.forEach(elem => {
      if (elem !== target) {
        elem.classList.remove(styles.emojiCont);
      }
    })
  }

  const handleDelete = (el) => {
    deleteComment(el._id)
      .then(() => 
        {
          setComments(comments.filter(e => e !== el));
          el.classList.remove(styles.emojiCont);
        }
      )
      .catch((err) => {
        console.error(`Ошибка удаления комментария: ${err}`);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    postComment({ text: values.text, target: 'status' }, userId)
      .then((res) => res && setValues({ text: '' }))
      .catch(err => console.error(err))
  }

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {comments?.map((el, i) =>
          <li className={i === 0 ? styles.textEl_first : styles.textEl} key={i}>
            <p className={styles.text}>{el.text}</p>
            {
              rules === 'admin'
              && <img src={closeIcon} alt="Удалить" className={styles.closeBtn} onClick={() => handleDelete(el)} />
            }
          </li>
        )}
      </ul>
      <form className={styles.form} onSubmit={e => handleSubmit(e)}>
        <input
          placeholder='Обратная связь'
          className={styles.input}
          name='text'
          type='text'
          onChange={handleChange}
          value={values.text}
        />
      </form>
      <div>
        <ul className={styles.emoji}>
          {smiles.map((el, i) =>
            <li key={i} onClick={(e) => { handleEmojiClick(e, el) }} className={styles.emojiContDefault} >
              <img alt={el.text} src={el.img} />
              {el.qty !== 0 && <span className={styles.count}>{el.qty}</span>}
            </li>)}
        </ul>
      </div>
    </div>
  )
}