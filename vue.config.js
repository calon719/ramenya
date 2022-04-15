module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/ramenya/'
    : '/',
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        const [obj] = args;

        obj.title = '拉麵屋';
        obj.icon = 'favicon.ico';
        obj.meta = {
          keywords: '拉麵',
          robots: 'index',
          HandheldFriendly: true,
          MobileOptimized: 320,
          description: '日本師父製作出來的道地拉麵，不用搭飛機去日本也能享受濃郁滋味。',
          og: {
            type: 'website',
            url: 'https://calon719.github.io/ramenya/',
            title: '拉麵屋',
            image: 'https://storage.googleapis.com/vue-course-api.appspot.com/calon/1648533681141.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=aON1Ya1g3f7N1UAByKMhD5jvSAMeXoH2whGhM7f6eE5mu43P0VTP%2FM7ttViK%2BOmSifkk83sZonBDe%2Be3l%2F6HFgnhQIi4Vz14bH%2BZ%2BD9AbtR5pa909WpWdnBdBsZ0K99VCU4z92ZzVtqvl7TfXWsCWzURQ1oE9CmfGZw9sJLonmlTNQbuoY9B2AIXEQdsCCN2XCkY31NwX4GVA4VaJ8bF9fiGHGYr%2Fllw7XxU3TKcPaj2gRJlHvnOeXN31D%2BF6JTOQUPvKJ80ORNwLyHRknqsXUVmjLQft9cmAbQWXzH1EBcFICX43BP%2F6GFcx9ZhERRDklsHe7LPxGdMO2z7Rzfwtg%3D%3D',
            description: '日本師父製作出來的道地拉麵，不用搭飛機去日本也能享受濃郁滋味。',
          },
        };

        return args;
      });
  },
};
