import classNames from 'classnames/bind'
import Content from './Content'
import styles from './Owner.module.sass'

const cx = classNames.bind(styles)
const Owner = () => {
  return (
    <div className={cx("wrapper")}>
        <div className={cx("container")}>
            <Content/>
        </div>
    </div>
  )
}

Owner.propTypes = {

}

export default Owner
