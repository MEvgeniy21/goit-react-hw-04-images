import styled from '@emotion/styled';
import { Form, Field } from 'formik';
import { AiOutlineSearch } from 'react-icons/ai';

export const Header = styled.header`
  top: 0;
  left: 0;
  position: sticky;
  z-index: 1100;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: ${p => p.theme.space[6]}px;
  padding-right: ${p => p.theme.space[4]}px;
  padding-left: ${p => p.theme.space[4]}px;
  padding-top: ${p => p.theme.space[3]}px;
  padding-bottom: ${p => p.theme.space[3]}px;
  color: ${p => p.theme.colors.white};
  background-color: ${p => p.theme.colors.bg};
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;

export const SearchForm = styled(Form)`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background-color: ${p => p.theme.colors.white};
  border-radius: ${p => p.theme.radii.sm};
  overflow: hidden;
`;

export const Button = styled.button`
  display: inline-block;
  width: ${p => p.theme.space[5]}px;
  height: ${p => p.theme.space[5]}px;
  border: ${p => p.theme.borders.none};
  opacity: 0.6;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  outline: ${p => p.theme.borders.none};

  &:hover {
    opacity: 1;
  }
`;

export const Icon = styled(AiOutlineSearch)`
  width: ${p => p.theme.space[4]}px;
  height: ${p => p.theme.space[4]}px;
`;

export const Input = styled(Field)`
  display: inline-block;
  width: 100%;
  font: inherit;
  font-size: ${p => p.theme.fontSizes.m};
  border: ${p => p.theme.borders.none};
  outline: ${p => p.theme.borders.none};
  padding-left: ${p => p.theme.space[2]}px;
  padding-right: ${p => p.theme.space[2]}px;

  &::placeholder {
    font: inherit;
    font-size: ${p => p.theme.fontSizes.m};
  }
`;
