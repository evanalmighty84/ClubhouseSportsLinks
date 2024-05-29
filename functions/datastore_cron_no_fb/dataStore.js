const {clearTable} = require('./clearTable.js');
// Now you can use clearTable in your code

const pushNewstoDatastore = async ({table, articles, rowIds}) => {
    await clearTable(table);


    for (let idx = 0; idx < articles.length; idx++) {
        const article = articles[idx];
        console.log('this should be the newest article order in the database' + article.title)
        const payload = {
            title: article.title,
            url: article.url,
            description: article.description,
            content: article.content
        };

        if (rowIds.length === 0) {
            await table.insertRow(payload);
        } else {
            await table.updateRow({...payload, ROWID: rowIds[idx]});
        }
    }

};
const pushNewstoDatastoreB = async ({tableB, articles, rowIdsB}) => {
    await clearTable(tableB);


    for (let idx = 0; idx < articles.length; idx++) {
        const article = articles[idx];
        console.log('this should be the newest article order in the database' + article.title)
        const payload = {
            title: article.title,
            url: article.url,
            description: article.description,
            content: article.content
        };

        if (rowIdsB.length === 0) {
            await tableB.insertRow(payload);
        } else {
            await tableB.updateRow({...payload, ROWID: rowIdsB[idx]});
        }
    }

};
const pushNewstoDatastore2 = async ({table2, articles, rowIds2}) => {
    await clearTable(table2);


    for (let idx = 0; idx < articles.length; idx++) {
        const article = articles[idx];
        console.log('this should be the newest article order in the database' + article.title)
        console.log('this should be the newest video in the database' + article.video1)
        const payload = {
            title: article.title,
            url: article.url,
            video1: article.video1,
            video2: article.video2,
            video3: article.video3,
            description: article.description,
            content: article.content
        };

        if (rowIds2.length === 0) {
            await table2.insertRow(payload);
        } else {
            await table2.updateRow({...payload, ROWID: rowIds2[idx]});
        }
    }

};
const pushNewstoDatastore2B = async ({table2B, articles, rowIds2B}) => {
    await clearTable(table2B);

    for (let idx = 0; idx < articles.length; idx++) {
        const article = articles[idx];
        console.log('this should be the newest article order in the database' + article.title)
        console.log('this should be the newest video in the database' + article.video1)
        const payload = {
            title: article.title,
            url: article.url,
            video1: article.video1,
            video2: article.video2,
            video3: article.video3,
            description: article.description,
            content: article.content
        };

        if (rowIds2B.length === 0) {
            await table2B.insertRow(payload);
        } else {
            await table2B.updateRow({...payload, ROWID: rowIds2B[idx]});
        }
    }

};
const pushNewstoDatastore3 = async ({table3, articles, rowIds3}) => {
    await clearTable(table3);


    for (let idx = 0; idx < articles.length; idx++) {
        const article = articles[idx];
        console.log('this should be the newest article order in the database' + article.title)
        const payload = {
            title: article.title,
            url: article.url,
            description: article.description,
            content: article.content
        };

        if (rowIds3.length === 0) {
            await table3.insertRow(payload);
        } else {
            await table3.updateRow({...payload, ROWID: rowIds3[idx]});
        }
    }

};
const pushNewstoDatastore3B = async ({table3B, articles, rowIds3B}) => {
    await clearTable(table3B);

    for (let idx = 0; idx < articles.length; idx++) {
        const article = articles[idx];
        console.log('this should be the newest article order in the database' + article.title)
        const payload = {
            title: article.title,
            url: article.url,
            description: article.description,
            content: article.content
        };

        if (rowIds3B.length === 0) {
            await table3B.insertRow(payload);
        } else {
            await table3B.updateRow({...payload, ROWID: rowIds3B[idx]});
        }
    }

};

module.exports = {
    pushNewstoDatastore,
    pushNewstoDatastoreB,
    pushNewstoDatastore2,
    pushNewstoDatastore2B,
    pushNewstoDatastore3,
    pushNewstoDatastore3B
};