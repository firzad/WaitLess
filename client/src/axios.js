import axios from 'axios';
import {net_path} from './pathing';

export default axios.create({
    baseURL: net_path,
    "Access-Control-Allow-Origin": "*",
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-TOKEN': document.cookie.split('csrftoken=')[1]
});
