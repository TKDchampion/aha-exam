import { useState } from 'react';
import './style.scss';
import classNames from 'classnames';
import checkedIcon from '../../assets/icons/checked.svg';
import unCheckedIcon from '../../assets/icons/unChecked.svg';
import { PanelInfo, Props } from './model';
import {
  verifyCharacter,
  verifyLowcase,
  verifyNumber,
  verifyUpcase,
} from '../../utils/verify';

function InputElement({
  isPassword,
  onChange,
  onFocus,
  onBlur,
  calssName,
  labelName,
  value,
}: Props) {
  const [panelData, setPanelData] = useState(PanelInfo);
  const verifyFun = (str: string) => {
    if (isPassword) {
      const copyData = JSON.parse(JSON.stringify(panelData));
      copyData[0].isChecked = verifyUpcase(str);
      copyData[1].isChecked = verifyLowcase(str);
      copyData[2].isChecked = verifyNumber(str);
      copyData[3].isChecked = verifyCharacter(str);
      copyData[4].isChecked = str.length > 8;
      setPanelData(copyData);
    }
    if (onChange) {
      onChange(str);
    }
  };
  const style = classNames('input-box', calssName);

  return (
    <div className="input-component-box">
      <div className={style}>
        <div className="input-box-label">
          {isPassword ? 'Password' : labelName}
        </div>
        <input
          type={isPassword ? 'password' : 'text'}
          onChange={(e) => verifyFun(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
        />
        {isPassword && (
          <div className="input-panel">
            {panelData.map((item) => {
              return (
                <div className="input-panel-item" key={item.id}>
                  {item.isChecked ? (
                    <img src={checkedIcon} alt="" />
                  ) : (
                    <img src={unCheckedIcon} alt="" />
                  )}
                  <div className="input-panel-item-text">{item.text}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default InputElement;
