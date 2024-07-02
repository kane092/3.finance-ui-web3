import { commafy } from '../utils/utils';

type props = {
    value: any,
    digit: any
}

export default function NumberField({
    value,
    digit
}: props) {
    if (digit == undefined) {
        digit = 2;
    }
    if (value != undefined) {
        return (
            <>{commafy(value, digit)}</>
        )

    } else {
        return (
            <>{commafy(0, digit)}</>
        )
    }
}