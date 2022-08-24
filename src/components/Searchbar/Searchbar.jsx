import { Formik } from 'formik';
import {
  SearchHeader,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnIcon,
  SearchFormInput,
} from './Searchbar.styled';

const INITIAL_VALUE = { search: '' };

export default function Searchbar() {
  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
  };

  return (
    <SearchHeader>
      <Formik initialValues={INITIAL_VALUE} onSubmit={handleSubmit}>
        <SearchForm>
          <SearchFormBtn type="submit">
            <SearchFormBtnIcon />
          </SearchFormBtn>

          <SearchFormInput
            name="search"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Formik>
    </SearchHeader>
  );
}
