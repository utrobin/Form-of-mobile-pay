import React from 'react';
import plural from '../tools/plural';

import './form.scss';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.onBlur = this.onBlur.bind(this);
    this.onPaste = this.onPaste.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      formElements: [],
      disabledSubmit: true,
      variableWord: 'рублей',
      visibilityWarning: false,
      priceError: false,
    };
  }

  componentDidMount() {
    this.setState({ formElements: [...document.querySelector('form').elements] });
    document.querySelector('form').elements[0].focus();
  }

  onKeyDown(event) {
    if (event.keyCode === 8) {
      if (event.target.value.length === 0) {
        const indexCurrentElement = this.getIndexCurrentElement(event.target);
        this.state.formElements[indexCurrentElement - 1].focus();
      } else if (event.target.value.length === 1) {
        event.preventDefault();
        event.target.value = '';
        const indexCurrentElement = this.getIndexCurrentElement(event.target);
        this.state.formElements[indexCurrentElement - 1].focus();
      }
    }
  }

  getIndexCurrentElement(currentElement) {
    let indexCurrentElement = 0;
    this.state.formElements.forEach((item, i) => {
      if (this.state.formElements[i] === currentElement) {
        indexCurrentElement = i;
      }
    }, this);

    return indexCurrentElement;
  }

  checkComplete() {
    const isValid = this.state.formElements.every((el, i) => {
      if (i < 4) {
        return this.state.formElements[i].value.length === this.state.formElements[i].maxLength;
      } else if (i === 4) {
        return +this.state.formElements[i].value > 0;
      }
      return true;
    });

    if (isValid === true) {
      this.setState({ disabledSubmit: false });
    } else {
      this.setState({ disabledSubmit: true });
    }
  }

  onPaste(event) {
    event.preventDefault();
    let paste = event.clipboardData.getData('Text');
    paste = paste.replace(/\D/g, '');

    if (paste.length !== 0) {
      const indexCurrentElement = this.getIndexCurrentElement(event.target);

      let countUsedSymbol = 0;
      let i = indexCurrentElement;
      for (; i < 4; i++) {
        if (countUsedSymbol === paste.length) {
          break;
        }

        const left = this.state.formElements[i].maxLength - this.state.formElements[i].value.length;
        let temp = '';
        for (let j = 0; j < left; j++) {
          if (countUsedSymbol === paste.length) {
            break;
          }
          temp += paste[countUsedSymbol];
          countUsedSymbol++;
        }
        this.state.formElements[i].value += temp;

        this.state.formElements[i].focus();
      }

      if (i === 4 && (this.state.formElements[i - 1].maxLength - this.state.formElements[i - 1].value.length) > 0) {
        this.state.formElements[i - 1].focus();
      } else {
        this.state.formElements[i].focus();
      }
    }
  }

  onBlur(event) {
    const indexCurrentElement = this.getIndexCurrentElement(event.target);

    if (indexCurrentElement === 4 && this.state.priceError === false) {
      this.setState({ visibilityWarning: false });
    }
  }

  onFocus(event) {
    const indexCurrentElement = this.getIndexCurrentElement(event.target);

    if (indexCurrentElement === 4) {
      this.setState({ visibilityWarning: true });
      return;
    }

    if (this.state.formElements[indexCurrentElement].value.length > 0) {
      return;
    }

    for (let i = 0; i < indexCurrentElement; i++) {
      if (this.state.formElements[i].value.length !== this.state.formElements[i].maxLength) {
        this.state.formElements[i].focus();
        break;
      }
    }
  }

  onChange(event) {
    if (event.target.value.replace(/[0-9]/g, '') !== '') {
      event.target.value = event.target.value.replace(/\D/g, '');
    }

    if (event.target.value === '') {
      event.preventDefault();
      this.checkComplete();
      return;
    }

    const indexCurrentElement = this.getIndexCurrentElement(event.target);
    if (indexCurrentElement === 4) {
      if (+event.target.value <= 0 || event.target.value > 5000) {
        this.setState({ priceError: true });
      } else {
        this.setState({ priceError: false });
      }

      const temp = plural(event.target.value, ['рубль', 'рубля', 'рублей'], 'rus');
      this.setState({ variableWord: temp });

      this.checkComplete();

      return;
    }

    if (event.target.value.length === event.target.maxLength) {
      this.state.formElements[indexCurrentElement + 1].focus();
    }

    this.checkComplete();
  }

  onSubmit(event) {
    event.preventDefault();

    const fields = {};
    this.state.formElements.forEach((element) => {
      const name = element.name;
      const value = element.value;

      if (!name) {
        return;
      }

      if (!fields[name]) {
        fields[name] = '';
      }

      fields[name] += value;
    });

    fields.toString = () => {
      Object.defineProperty(fields, 'toString', { enumerable: false });
      let temp = '';
      for (const key in fields) {
        temp += `${key}: ${fields[key]} \n`;
      }

      return temp;
    };

    alert(fields);
  }

  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        <div className="form__telephone">
          <label className="form__label" htmlFor="telephone">Номер телефона</label><br />
          <span>+7 | </span>
          <input
            name="telephone"
            type="text"
            onInput={this.onChange}
            onPaste={this.onPaste}
            placeholder="123"
            className="form__input form__input_middle"
            maxLength="3"
          />
          <span> | </span>
          <input
            name="telephone"
            type="text"
            onInput={this.onChange}
            onPaste={this.onPaste}
            onFocus={this.onFocus}
            placeholder="345"
            onKeyDown={this.onKeyDown}
            className="form__input form__input_middle"
            maxLength="3"
          />
          <span> - </span>
          <input
            name="telephone"
            type="text"
            onInput={this.onChange}
            onPaste={this.onPaste}
            onFocus={this.onFocus}
            placeholder="67"
            onKeyDown={this.onKeyDown}
            className="form__input form__input_low"
            maxLength="2"
          />
          <span> - </span>
          <input
            name="telephone"
            type="text"
            onInput={this.onChange}
            onPaste={this.onPaste}
            onFocus={this.onFocus}
            placeholder="89"
            onKeyDown={this.onKeyDown}
            className="form__input form__input_low"
            maxLength="2"
          />
        </div>

        <div className="form__price">
          <label className="form__label" htmlFor="price">Сумма пополнения</label>
          <br />
          <input
            name="price"
            type="text"
            onChange={this.onChange}
            onBlur={this.onBlur}
            className={this.state.priceError ? 'form__input form__price__input form__input_large form_error'
                   : 'form__input form__price__input form__input_large'}
            placeholder="0"
            maxLength="4"
            min="0"
            max="5000"
            onFocus={this.onFocus}
          />
          <span className="form__price__span">{this.state.variableWord}</span>
          <i
            className={this.state.priceError ? 'form__price__warning form_error' : 'form__price__warning'}
            style={{ visibility: (this.state.visibilityWarning ? '' : 'hidden') }}
          >
            Cумма платежа не может быть меньше 1 руб. и больше 5000 руб.
          </i>
        </div>

        <input
          type="submit"
          value="Продолжить"
          className={this.state.disabledSubmit ? 'form__submit form__submit_disabled' : 'form__submit'}
          disabled={this.state.disabledSubmit ? 'disabled' : ''}
        />
      </form>
    );
  }
}

export default Form;
