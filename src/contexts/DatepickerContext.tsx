import React, { createContext, useReducer, useContext, ReactNode } from 'react';

interface DatepickerState {
  isOpenYearPage: boolean;
  year: number;
  startYear: number;
  endYear: number;
}

type DatepickerAction =
  | { type: 'SET_START_AND_END_YEAR'; payload: { startYear: number } }
  | { type: 'SET_YEAR'; payload: { year: number } }
  | { type: 'OPEN_YEAR_PAGE' }
  | { type: 'CLOSE_YEAR_PAGE' };

const initialState: DatepickerState = {
  isOpenYearPage: false,
  year: new Date().getFullYear(),
  startYear: new Date().getFullYear() - 10,
  endYear: new Date().getFullYear() + 10,
};

const datepickerReducer = (
  state: DatepickerState,
  action: DatepickerAction,
): DatepickerState => {
  switch (action.type) {
    case 'SET_START_AND_END_YEAR':
      return {
        ...state,
        startYear: action.payload.startYear,
        endYear: action.payload.startYear + 20,
      };
    case 'SET_YEAR':
      return {
        ...state,
        year: action.payload.year,
        startYear: action.payload.year - 10,
        endYear: action.payload.year + 10,
      };
    case 'OPEN_YEAR_PAGE':
      return {
        ...state,
        isOpenYearPage: true,
      };
    case 'CLOSE_YEAR_PAGE':
      return {
        ...state,
        isOpenYearPage: false,
      };
    default:
      return state;
  }
};

const DatepickerContext = createContext<{
  state: DatepickerState;
  dispatch: React.Dispatch<DatepickerAction>;
} | null>(null);

// eslint-disable-next-line react/function-component-definition
const DatepickerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(datepickerReducer, initialState);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <DatepickerContext.Provider value={{ state, dispatch }}>
      {children}
    </DatepickerContext.Provider>
  );
};

export default DatepickerProvider;
export const useDatepicker = () => {
  const context = useContext(DatepickerContext);
  if (!context) {
    throw new Error('useDatepicker 必須在 DatepickerProvider 中使用');
  }
  return context;
};
