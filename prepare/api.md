# YiKe APP API接口

## 一、栏目接口

| API名称 | API接口 |
| :------:| :------: |
| 栏目总览 | https://moment.douban.com/api/columns |
| 栏目文章列表及翻页 | https://moment.douban.com/api/column/{columnId}/posts?count={20}&max_id={maxId} |

## 二、作者接口

| API名称 | API接口 |
| :------:| :------: |
| 推荐作者 | https://moment.douban.com/api/auth_authors/rec |
| 热门作者 | https://moment.douban.com/api/auth_authors/all?count={20}&start={20} |
| 作者主页信息 | https://moment.douban.com/api/user/{authorId}/profile |
| 作者更多文章信息 | https://moment.douban.com/api/author/{authorId}/posts?count=10&max_id={maxId} |

## 三、文章详情接口

| API名称 | API接口 |
| :------:| :------: |
| 文章详情 | https://moment.douban.com/api/post/100484 |

## 四、评论接口

| API名称 | API接口 |
| :------:| :------: |
| 文章热门评论列表 | https://moment.douban.com/api/post/{postId}/popular_comments |
| 文章评论列表 | https://moment.douban.com/api/post/{postId}/comments?count=20&max_id={maxId} |

## 五、其它接口

| API名称 | API接口 |
| :------:| :------: |
| 根据日期查询文章 | https://moment.douban.com/api/stream/date/${2015-09-24} |
