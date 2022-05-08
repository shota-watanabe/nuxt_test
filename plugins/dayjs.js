import 'dayjs/locale/ja'
import dayjs from 'dayjs'

dayjs.locale('ja')

export default (({ app }, inject) => {
    // 文字が入ってきたらdayjsの文字として使う
    inject('dayjs', string => dayjs(string))
})