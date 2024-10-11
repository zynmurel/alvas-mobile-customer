declare module 'twrnc' {
    import { StyleProp, ViewStyle, TextStyle } from 'react-native';

    export default function twrnc(strings: TemplateStringsArray, ...values: (string | number)[]): StyleProp<ViewStyle | TextStyle>;

    // Extend this interface with more classes as you need them
    export interface Twrnc {
        (styles: TemplateStringsArray, ...values: (string | number)[]): StyleProp<ViewStyle | TextStyle>;
    }
}
