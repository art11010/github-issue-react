import styles from './ListItem.module.css';
import ListItemLayout from './ListItemLayout';
import Badge from './Badge';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export default function ListItem({
  checked,
  onChangeCheckbox,
  onClickTitle,
  data,
}) {
  dayjs.extend(relativeTime);

  const badges = data.labels;
  const state = data.state === 'open' ? 'opened' : 'closed';
  const date = data.state === 'open' ? data.created_at : data.closed_at;

  return (
    <ListItemLayout checked={checked} onClick={onChangeCheckbox}>
      <div>
        <div role="button" onClick={onClickTitle} className={styles.title}>
          {data.title}
          {badges.length > 0 &&
            badges.map((props, idx) => <Badge key={idx} {...props} />)}
        </div>
        <div className={styles.description}>
          #{data.number} {state} {dayjs(date).fromNow()}
        </div>
      </div>
    </ListItemLayout>
  );
}
