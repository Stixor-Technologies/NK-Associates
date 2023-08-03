export const convertToPakistaniNumbering = (input: number | string) => {
    let num: number = typeof input === 'string' ? parseInt(input) : input;
    console.log(typeof input)
    let res: number;
    // Nine zeros (1,00,00,000) => 1 Crore
    if (num >= 10000000) {
        res = (num / 10000000);
        return (res % 1 !== 0 ? res.toFixed(2) : Math.floor(res)) + ' Crore';
    }
    // Seven zeros (1,00,000) => 1 Lac
    else if (num >= 100000) {
        res = (num / 100000);
        return (res % 1 !== 0 ? res.toFixed(2) : Math.floor(res)) + ' Lac';
    }
    // Five zeros (1000) => Thousand
    else if (num >= 1000) {
        res = (num / 1000);
        return (res % 1 !== 0 ? res.toFixed(2) : Math.floor(res)) + ' Thousand';
    }
    return num.toString();
}
