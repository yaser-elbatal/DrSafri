import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';



const reactotron = Reactotron.configure({ name: 'Drsafri', host: '192.168.101.36', port: 9090 })
    .use(reactotronRedux()).useReactNative()
    .connect();







export default reactotron







