import PropTypes from 'prop-types';
import css from './ContactItem.module.css';

export const ContactItem = ({ id, name, number, deleteItem }) => (
    <li className={css.list_item} >{`${name} : ${number}`}
        <button
            className={css.delete_btn}
            type="button"
            onClick={() => deleteItem(id)}
            >Delete
        </button>
    </li>
)

ContactItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    deleteItem:PropTypes.func.isRequired,
}