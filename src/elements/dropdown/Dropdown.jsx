import { useDispatch, useSelector } from 'react-redux';
import { modalToggler } from '../../redux/features/formSlice/formSlice';
import './dropdown.css';

const Dropdown = () => {
    // Get the selected coin data from the Redux state
    const { checkedItem } = useSelector((state) => state.form);

    // Get the dispatch function to trigger Redux actions
    const dispatch = useDispatch();

    // Function to toggle the dropdown
    const toggleDropdown = () => {
        // Dispatch the modalToggler action with the value true to open the modal
        dispatch(modalToggler(true));
    };

    return (
        <main className='dropdown_container'>
            <section id='listField1'>
                <section onClick={toggleDropdown}>
                    <div className='selected_item'>
                        <img src={`${checkedItem?.url ? checkedItem.url : '/img/BITCOIN LOGO.svg'}`} alt="Selected Coin Logo" />
                        <p>{`${checkedItem?.name ? checkedItem.name : 'Bitcoin'}`}</p>
                    </div>

                    {/* Dropdown arrow icon */}
                    <svg className={`dropdown_state`} id='dropdownField1' width="14" height="7" viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 0H0L7 7L14 0Z" fill="#6E56F8" />
                    </svg>
                </section>
            </section>
        </main>
    );
};

export default Dropdown;
