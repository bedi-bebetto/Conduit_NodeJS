const request = require('supertest')
const app = require('../index.js')
describe('Articles API', () => {

    beforeAll(() => {
        // SETUP TEST DATABASE WITH DUMMY RECORDS
    })

    afterAll(() => {
        // TEARDOWN DATABASE
    })

    describe('/mature-content', () => {
        let articles;
        beforeAll(async () => {
            const res = await request(app).get('/api/articles/mature-content')
            articles = res.body.articles;
            console.log(articles)
            if (!res.body.articles || !Array.isArray(res.body.articles)) {
                fail('Request responds with no articles');
            }
        })

        it('should show only mature content articles', async () => {
            const areOnlyMatureContent = articles.every(article => article.matureContent);
            expect(areOnlyMatureContent).toBeTruthy();
        });

        it('should be sorted by date DESC', async () => {
            const areSortedByDate = articles.every((article, index) => {
                if (index) {
                    return new Date(article.createdAt).getTime() < new Date(articles[index - 1].createdAt).getTime();
                }
                return true;
            })
            expect(areSortedByDate).toBeTruthy();
        });
    })
});
