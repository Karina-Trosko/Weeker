import EStyleSheet from 'react-native-extended-stylesheet';

export const colors = EStyleSheet.create({
    $primaryColorVar: '$primaryColor',
    $primaryDarkVar: '$primaryDark',
    $primaryWhiteVar: '$primaryWhite',
    $primaryAccentColorVar: '$primaryAccentColor',
});

export const indents = {
    marginBottomList: 50,
};

EStyleSheet.build({
    $primaryColor: '#20B2AA',
    $primaryDark: '#008B8B',
    $primaryWhite: '#FFFFFF',
    $primaryAccentColor: '#FA8072',
});
