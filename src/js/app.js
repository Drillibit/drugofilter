import '../css/style.sass'
import FriendsMain from './module/FriendsMain';
import items from './info';


VK.init({
    apiId: 6491753
});

function auth() {
    return new Promise((resolve, reject) => {
        VK.Auth.login(data => {
            if (data.session) {
                resolve();
            } else {
                reject(new Error('Не удалось авторизоваться'));
            }
        }, 2);
    });
}

function callAPI(method, params) {
    params.v = '5.76';

    return new Promise((resolve, reject) => {
        VK.api(method, params, (data) => {
            if (data.error) {
                reject(data.error);
            } else {
                resolve(data.response);
            }
        });
    })
}

(async () => {
    try {
        await auth();
        const [me] = await callAPI('users.get', {
            name_case: 'gen'
        });


        const friends = await callAPI('friends.get', {
            fields: 'city, country, photo_100'
        });
        
        const stateData = FriendsMain(friends);


    } catch (e) {
        console.error(e);
    }
})();