import classNames from 'classnames';
import { IconAngleLeft, IconAngleRight, IconCalendarPlus } from 'hds-react';
import React, {
  ChangeEvent,
  FunctionComponent,
  MutableRefObject,
  useEffect,
} from 'react';

import { translateValue } from '../../utils/translateUtils';
import Checkbox from '../../../common/components/checkbox/Checkbox';
import DateRangePicker from '../dateRangePicker/DateRangePicker';
import styles from './dateSelectorMenu.module.scss'; // the locale you want
import useConfig from '../../hooks/useConfig';

export const testIds = {
  menu: 'date-selector-menu',
};

interface Props {
  backBtnRef?: MutableRefObject<HTMLButtonElement | null>;
  customDatesBtnRef?: MutableRefObject<HTMLButtonElement | null>;
  dateTypes: string[];
  dateTypeOptions: string[];
  endDate: Date | null;
  isCustomDate: boolean;
  isOpen: boolean;
  name: string;
  onChangeDateTypes: (value: string[]) => void;
  onChangeEndDate: (date: Date | null) => void;
  onChangeStartDate: (date: Date | null) => void;
  onCloseMenu: () => void;
  startDate: Date | null;
  toggleIsCustomDate: () => void;
}

const DateSelectorMenu: FunctionComponent<Props> = ({
  backBtnRef,
  customDatesBtnRef,
  dateTypes,
  dateTypeOptions,
  endDate,
  isCustomDate,
  isOpen,
  name,
  onChangeDateTypes,
  onChangeEndDate,
  onChangeStartDate,
  onCloseMenu,
  startDate,
  toggleIsCustomDate,
}) => {
  const { t } = useConfig();

  useEffect(() => {
    const clearDatesRange = () => {
      onChangeStartDate(null);
      onChangeEndDate(null);
    };

    if (dateTypes.length > 0) {
      clearDatesRange();
    }
  }, [dateTypes, onChangeStartDate, onChangeEndDate]);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (dateTypes.indexOf(event.target.value) !== -1) {
      onChangeDateTypes(
        dateTypes.filter((item) => item !== event.target.value)
      );
    } else {
      onChangeDateTypes([...dateTypes, event.target.value]);
    }
  };

  const handleStartDateChange = (date: Date | null) => {
    onChangeStartDate(date);
    onChangeDateTypes([]);
  };

  const handleEndDateChange = (date: Date | null) => {
    onChangeEndDate(date);
    onChangeDateTypes([]);
  };

  if (!isOpen) return null;

  return (
    <div
      data-testid={testIds.menu}
      className={classNames(styles.dateSelectorMenu, {
        [styles.isCustomDate]: isCustomDate,
      })}
    >
      {!isCustomDate && (
        <div className={styles.checkboxWrapper}>
          {dateTypeOptions.map((option) => {
            return (
              <Checkbox
                key={option}
                checked={dateTypes.indexOf(option) !== -1}
                id={`name_${option}`}
                label={translateValue(
                  'common:dateSelector.dateType',
                  option,
                  t
                )}
                name={name}
                onChange={handleCheckboxChange}
                value={option}
              />
            );
          })}
        </div>
      )}

      <button
        ref={customDatesBtnRef}
        className={classNames(styles.button, styles.btnSelectDates, {
          [styles.hidden]: isCustomDate,
        })}
        onClick={toggleIsCustomDate}
        type="button"
      >
        <IconCalendarPlus aria-hidden />
        <div className={styles.buttonText}>
          {t<string>('common:dateSelector.menu.buttonCustom')}
        </div>
        <IconAngleRight aria-hidden />
      </button>

      <button
        ref={backBtnRef}
        className={classNames(styles.button, styles.btnBack, {
          [styles.hidden]: !isCustomDate,
        })}
        onClick={toggleIsCustomDate}
        type="button"
      >
        <IconAngleLeft aria-hidden />
        <div className={styles.buttonText}>
          {t<string>('common:dateSelector.menu.buttonBack')}
        </div>
      </button>

      {isCustomDate && (
        <div className={styles.wrapper}>
          <DateRangePicker
            endDate={endDate}
            onChangeEndDate={handleEndDateChange}
            onChangeStartDate={handleStartDateChange}
            startDate={startDate}
          />
        </div>
      )}
      <button
        className={classNames(styles.button, styles.btnClose, {
          [styles.hidden]: !isCustomDate,
        })}
        onClick={onCloseMenu}
        type="button"
      >
        <div className={styles.buttonText}>
          {t<string>('common:dateSelector.menu.buttonClose')}
        </div>
      </button>
    </div>
  );
};

export default DateSelectorMenu;
