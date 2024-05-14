import classNames from "classnames/bind";
import styles from './TextError.module.sass'
import PropTypes from 'prop-types'

const cx = classNames.bind(styles);

function TextError({error}) {
    return ( 
        <div className={cx('wrapper')}>
            {error && <span className={cx('wrapperError')}>{error}</span>}
        </div>
     );
}

TextError.propTypes = {
    error: PropTypes.string
}

export default TextError;