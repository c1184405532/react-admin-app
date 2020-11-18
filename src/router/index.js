
import asyncComponent from 'components/asyncComponent'
// import searchRouter from './search'
// const AsyncLayoutHome = asyncComponent(() => import("components/layoutHome"));
// const AsyncLogin = asyncComponent(() => import("pages/user/login"));
// const AsyncHomeIndex = asyncComponent(() => import("pages/home/indexPage"));
// const AsyncSearchPage = asyncComponent(() => import("pages/home/searchPage"));
// const AsyncMyPage = ;
//isRouterBack 是否可以不需要登录进入
//isToken 是否需要token校验
const router = [
	{
		meta: { title:'劳务人员' },
		path: '/laborPersonnel/list',
		name: 'laborPersonnelList',
		components: asyncComponent(() => import("pages/laborPersonnel"))
	},


]
export default router;