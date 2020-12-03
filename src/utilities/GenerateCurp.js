
class GenerateCurp {
  constructor(form) {
    this._form = form ;

  }

  _transformToUpperCase(form) {
    for (const [key, value] of Object.entries(form)) {
      form[key] = value.toUpperCase();
    }
    return form;
  }

  get curp() {
    return `Este es tu curp ${this._buildCurp(this._form)}`;
  }

  get rfc() {
    return `Este es tu RFC ${this._buildRfc(this._form)}`;
  }

  get tableReference() {
    return {
      ' ': '00',
      '0': '00',
      '1': '01',
      '2': '02',
      '3': '03',
      '4': '04',
      '5': '05',
      '6': '06',
      '7': '07',
      '8': '08',
      '9': '09',
      '&': '10',
      'A': '11',
      'B': '12',
      'C': '13',
      'D': '14',
      'E': '15',
      'F': '16',
      'G': '17',
      'H': '18',
      'I': '19',
      'J': '21',
      'K': '22',
      'L': '23',
      'M': '24',
      'N': '25',
      'O': '26',
      'P': '27',
      'Q': '28',
      'R': '29',
      'S': '32',
      'T': '33',
      'U': '34',
      'V': '35',
      'W': '36',
      'X': '37',
      'Y': '38',
      'Z': '39',
      'Ñ': '40',
    };
  }

  get _tableReferenceQuotientRemainder() {
    let key = 9;
    const tableReferenceQuotientRemainder = new Array(key).fill(1).reduce((acum, _, index) => {
      return {
        [index]: index + 1,
        ...acum,
      };
    }, {});

    for (let item = 65; item <= 90; item++) {
      if (item === 79) { continue; }
      tableReferenceQuotientRemainder[key++] = String.fromCharCode(item);
    }
    return tableReferenceQuotientRemainder;
  }

  get _tableReferenceCheckDigit() {
    let key = 10;
    const tableReferenceCheckDigit = new Array(key).fill(1).reduce((acum, _, index) => {
      return {
        [index]: `0${index}`,
        ...acum,
      };
    }, { '&': '24', ' ': '37', 'Ñ': '38' });

    for (let item = 65; item <= 90; item++) {
      if (key === 24) {
        item--;
        key++;
        continue;
      }
      tableReferenceCheckDigit[String.fromCharCode(item)] = `${key++}`;
    }
    return tableReferenceCheckDigit;
  }

  _buildRfc(form) {
    let { name, lastName, secondLastName } = this._transformToUpperCase(form);
    const { birthDate } = this._transformToUpperCase(form);
    name = this._cleanName(name);
    lastName = this._cleanName(lastName);
    secondLastName = this._cleanName(secondLastName);
    const nameCode = this._getDataFromNames(name, lastName, secondLastName);
    const dateCode = this._getDate(birthDate);
    const homoClave = this._getHomoClave(`${lastName} ${secondLastName} ${name}`);
    const rfc = `${nameCode}${dateCode}${homoClave}`;
    return `${rfc}${this._get_check_digit(rfc)}`;
  }

  _getHomoClave(name) {
    const transformadedName = ['0', ...this.convertToDigits(name, this.tableReference)].join('');
    const listResult = [];
    for (let index = 0; index < transformadedName.length - 1; index++) {
      const currentElement = transformadedName[index];
      const factorB = transformadedName[index + 1];
      const factorA = `${currentElement}${factorB}`;
      listResult.push(Number(factorA) * Number(factorB));
    }
    const sum = `${this._getSum(listResult)}`.slice(-3);
    const quotient = Math.trunc(sum / 34);
    const remainder = sum % 34;
    const quotientCode = this._tableReferenceQuotientRemainder[quotient];
    const remainderCode = this._tableReferenceQuotientRemainder[remainder];
    return `${quotientCode}${remainderCode}`;
  }

  convertToDigits(name, table) {
    return name.split('').map((char) => table[char]);
  }

  _getSum(list) {
    return list.reduce((acum, current) => {
      return acum + current;
    }, 0);
  }

  _get_check_digit(rfc) {
    const factor = 11;
    const transformadedName = this.convertToDigits(rfc, this._tableReferenceCheckDigit);
    const sum = this._applyFormula(transformadedName);
    const remainder = sum % factor;
    return this._setDigit(remainder, factor);
  }

  _setDigit(remainder, factor) {
    return (remainder % 10) ?
      factor - remainder :
      (remainder && 'A');
  }

  _applyFormula(list) {
    const base = list.length + 1;
    return list.reduce((acum, code, index) => {
      return acum + (code * (base - index));
    }, 0);
  }

  _buildCurp(form) {
    const { birthDate, gender, state } = this._transformToUpperCase(form);
    let { name, lastName, secondLastName } = this._transformToUpperCase(form);
    name = this._cleanName(name);
    lastName = this._cleanName(lastName);
    secondLastName = this._cleanName(secondLastName);
    const nameCode = this._getDataFromNames(name, lastName, secondLastName);
    const dateCode = this._getDate(birthDate);
    const genderCode = this._getGender(gender);
    const stateCode = this._getState(state);
    const consonantCode = `${this._getConsonant(lastName)}${this._getConsonant(secondLastName)}${this._getConsonant(name)}`;
    const digitsFromBirthDate = this._getDigitsFromBirthDate(birthDate);
    const curp = `${nameCode}${dateCode}${genderCode}${stateCode}${consonantCode}${digitsFromBirthDate}`;
    return `${curp}${this._getLastDigit(curp)}`;
  }

  _getDataFromNames(name, lastName, secondLastName) {
    return `${lastName.substring(0, 1)}${this._searchVower(lastName)}${secondLastName.substring(0, 1)}${name.substring(0, 1)}`;
  }

  _searchVower(lastName) {
    const vocales = 'AEIOU';
    for (const i = 1; i < lastName.length; i++)	{
      const c = lastName.charAt(i);
      if (vocales.indexOf(c) >= 0) {
        return c;
      }
    }
    return 'X';
  }

  _cleanName(name) {
    const pronuns = new RegExp(/^(DE |DEL |LO |LOS |LA |LAS )+/);
    const names = new RegExp(/^(MARIA |JOSE )/);
    return name.replace(pronuns, '').replace(names, '');
  }

  _getDate(birthDate) {
    return birthDate.substring(8, 10) + birthDate.substring(3, 5) + birthDate.substring(0, 2);
  }

  _getGender(gender) {
    return gender === 'M' ?
      'H' :
      'M';
  }

  _getState(state) {
    return ['DF', 'AS', 'BC', 'BS',
      'CC', 'CL', 'CM', 'CS', 'CH',
      'DG', 'GT', 'GR', 'HG', 'JC',
      'MC', 'MN', 'MS', 'NT', 'NL',
      'OC', 'PL', 'QT', 'QR', 'SP',
      'SL', 'SR', 'TC', 'TS', 'TL',
      'VZ', 'YN', 'ZS', 'NE'][state];
  }

  _getConsonant(name) {
    const vocales = 'AEIOU ��.';
    let i,
      c;
    for (i = 1; i < name.length; i++)	{
      c = name.charAt(i);
      if (vocales.indexOf(c) < 0) {
        return c;
      }
    }
    return 'X';
  }

  _getDigitsFromBirthDate(birthDate) {
    return birthDate.substring(6, 8) === '19' ?
      '0' :
      'A';
  }

  _getLastDigit(curp) {
    let i,
      c,
      dv = 0;
    for (i = 0; i < curp.length; i++) {
      c = this._table(curp.charAt(i), curp.charCodeAt(i));
      dv += c * (18 - i);
    }
    dv %= 10;
    return dv == 0 ? 0 : 10 - dv;
  }

  _table(i, x) {
    if (i >= '0' && i <= '9') return x - 48;
    if (i >= 'A' && i <= 'N') return x - 55;
    if (i >= 'O' && i <= 'Z') return x - 54;
    return 0;
  }
}

export default GenerateCurp;
