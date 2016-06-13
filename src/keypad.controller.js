export class KeypadController {

    constructor(
        $rootScope,
        KeypadConfig
    ) {
        'ngInject';

        this.$rootScope = $rootScope;
        this.KeypadConfig = KeypadConfig;


        this._activate();

    }




    _activate() {

        // Expose backspace svg template to dom
        this.backspaceTemplate = this.KeypadConfig.backspaceTemplate;

        // The numbers that make up the keypad
        this.numbers = this.KeypadConfig.numbers;

        // Set the max length
        this.bcMaxLength = this.bcMaxLength || this.KeypadConfig.maxLength;

        // Set the max decimals
        this.bcMaxDecimals = this.bcMaxDecimals || this.KeypadConfig.maxDecimals;

        // Set the decimal point
        this.bcDecimalPoint = this.bcDecimalPoint || this.KeypadConfig.decimalPoint;

        // Set and replace the decimal point
        if (this.numbers.indexOf(this.KeypadConfig.decimalPoint) > -1) {
            this.numbers[this.numbers.indexOf(this.KeypadConfig.decimalPoint)] =
                this.bcDecimalPoint;
        }
    }


    /**
     * Add the selected number to the number string
     *
     * @param {String} number
     */
    setNumber(number) {

        // If the decimal point is entered
        if (number === this.bcDecimalPoint) {
            // Add a zero, if it is the first character
            if (this.bcNumberModel === '') {
                this.bcNumberModel = '0';
            }
            // If the decimal point exists, exit
            if (this.bcNumberModel.indexOf(this.bcDecimalPoint) > -1) {
                return; /* do nothing */
            }
        }
        // If the max decimal places is reached
        if (this.bcMaxDecimals && angular.isNumber(+this.bcMaxDecimals)) {
            if (this.bcNumberModel.indexOf(this.bcDecimalPoint) > -1) {
                if (this.bcNumberModel.length -
                    this.bcNumberModel.indexOf(this.bcDecimalPoint) - 1 >=
                    this.bcMaxDecimals) {
                    return; /* do nothing */
                }
            }
        }
        // If more zeros are added to the beginning, exit
        if (number === 0 && this.bcNumberModel === '0') {
            return; /* do nothing */
        }

        if (!this.bcMaxLength || this.bcNumberModel.length < this.bcMaxLength) {
            this.bcNumberModel += number;
        }

    }


    /**
     * Delete the last number from the number string
     */
    deleteNumber() {
        const length = this.bcNumberModel.length;

        // If at least one number exists
        if (length > 0) {
            this.bcNumberModel = this.bcNumberModel.substring(0, length - 1);
        } else {
            // TODO: Expose something via two-way binding rather than using $emit
            this.$rootScope.$emit('KeypadGoBack');
        }
    }

}

