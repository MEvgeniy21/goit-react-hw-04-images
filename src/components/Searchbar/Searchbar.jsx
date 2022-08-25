import { Formik } from 'formik';
import * as SC from './Searchbar.styled';

const INITIAL_VALUE = { search: '' };

export default function Searchbar({ onSubmit }) {
  const handleSubmit = (values, actions) => {
    onSubmit(values);
    actions.resetForm();
  };

  return (
    <SC.Header>
      <Formik initialValues={INITIAL_VALUE} onSubmit={handleSubmit}>
        <SC.SearchForm>
          <SC.Button type="submit">
            <SC.Icon />
          </SC.Button>

          <SC.Input
            name="search"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SC.SearchForm>
      </Formik>
    </SC.Header>
  );
}
