/**
 * @file axios mock file
 **/

export default {
    get() {
        return new Promise((resolve, reject) => {
            resolve({data: 'value'});
        });
    }
};
