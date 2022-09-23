import { Fragment } from 'react'
import { FieldError, useController, UseControllerProps } from 'react-hook-form'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/20/solid'
import ReactDatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"


interface PropTypes extends UseControllerProps, React.InputHTMLAttributes<HTMLInputElement> {
  name: string,
  defaultValue?: string,
  control?: any,
  error?: FieldError,
  label?: string,
  inline?: boolean,
}

const DatePicker = (props: PropTypes) => {
  const { control, error, name } = props
  const { field: { onChange, onBlur, ref, value } } = useController({
    name,
    control,
  });
  const months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];

  return (
    <Fragment>
      <ReactDatePicker
        disabledKeyboardNavigation
        onChange={e => onChange(e?.toISOString().split('T')[0])}
        onBlur={onBlur}
        selected={new Date(value)}
        ref={ref}
        inline
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
        <div className="bg-white flex justify-between items-center px-3">
          <button type="button" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            <ChevronLeftIcon className="w-8 h-8" />
          </button>
          <div>
            <p>{date.getFullYear()}</p>
            <h3 className="-mb-5">{months[date.getMonth()]}</h3>
          </div>
          <button type="button" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            <ChevronRightIcon className="w-8 h-8" />
          </button>
        </div>
        )}
      />
      {error?.message &&
        <p className="error-text" id={`${name}-error`}>{error?.message}</p>
      }
    </Fragment>
  )
}


export default DatePicker
