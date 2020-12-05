
import asyncComponent from 'components/asyncComponent'
// import searchRouter from './search'

//isRouterBack 是否可以不需要登录进入
//isToken 是否需要token校验
/**
 * 有分类children的路由，当前对象不用定义components，且定义了之后也无效。如果需要请前往conponents/sider进行修改。
 * router.content 定义在侧边栏点击出现的路由。
 * router.other 定义其他一级路由，直接跳转页面。
 */
const router = {
	content:[
		{
			meta: { title:'劳务人员' },
			path: '/laborPersonnel/list',
			name: 'laborPersonnelList',
			components: asyncComponent(() => import("pages/laborPersonnel"))
		},
		{
			meta: { title:'劳务人员1' },
			path: '/laborPersonnel/list1',
			name: 'laborPersonnelList1',
			components: asyncComponent(() => import("pages/laborPersonnel"))
		},
		{
			meta: { title:'劳务人员2' },
			path: '/laborPersonnel/list2',
			name: 'laborPersonnelList2',
			//components: asyncComponent(() => import("pages/laborPersonnel")),
			children:[
				{
					meta: { title:'劳务人员2-1' },
					path: '/laborPersonnel/list2-1',
					name: 'laborPersonnelList2-1',
					components: asyncComponent(() => import("pages/laborPersonnel")),
				},
				{
					meta: { title:'劳务人员2-2' },
					path: '/laborPersonnel/list2-2',
					name: 'laborPersonnelList2-2',
					//components: asyncComponent(() => import("pages/laborPersonnel")),
					children:[
						{
							meta: { title:'劳务人员2-2-1',},
							path: '/laborPersonnel/list2-2-1',
							name: 'laborPersonnelList2-2-1',
							//components: asyncComponent(() => import("pages/laborPersonnel")),
							children:[
								{
									meta: { title:'劳务人员2-2-1-1',isTooltip:true },
									path: '/laborPersonnel/list2-2-1-1',
									name: 'laborPersonnelList2-2-1-1',
									components: asyncComponent(() => import("pages/laborPersonnel")),
								},
								{
									meta: { title:'劳务人员2-2-1-2' ,isTooltip:true},
									path: '/laborPersonnel/list2-2-1-2',
									name: 'laborPersonnelList2-2-1-2',
									components: asyncComponent(() => import("pages/laborPersonnel")),
								}
							],
						},
						{
							meta: { title:'劳务人员2-2-2' ,isTooltip:true},
							path: '/laborPersonnel/list2-2-2',
							name: 'laborPersonnelList2-2-2',
							components: asyncComponent(() => import("pages/laborPersonnel")),
						}
					],
				}
			],
		},
	],
	other:[
		{
			meta: { title:'登录' },
			path: '/user/login',
			name: 'userLogin',
			components: asyncComponent(() => import("pages/login"))
		},
	]
}
export default router;