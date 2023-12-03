import {
	HiOutlineViewGrid,
	HiOutlineCube,
	HiOutlineShoppingCart,
	HiOutlineUsers,
	HiOutlineDocumentText,
	HiOutlineAnnotation,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog,
	HiOutlineLogout
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/client',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'projects',
		label: 'Projects',
		path: '/client/projects',
		icon: <HiOutlineCube />
	},
	// {
	// 	key: 'orders',
	// 	label: 'Orders',
	// 	path: '/client/orders',
	// 	icon: <HiOutlineShoppingCart />
	// },
	// {
	// 	key: 'customers',
	// 	label: 'Customers',
	// 	path: '/client/customers',
	// 	icon: <HiOutlineUsers />
	// },
	{
		key: 'transactions',
		label: 'Transactions',
		path: '/client/transactions',
		icon: <HiOutlineDocumentText />
	},
	{
		key: 'messages',
		label: 'Messages',
		path: '/client/messages',
		icon: <HiOutlineAnnotation />
	},
	{
		
	}

]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/client/settings',
		icon: <HiOutlineCog />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '/client/support',
		icon: <HiOutlineQuestionMarkCircle />
	},
	// {
	// 	key: 'Sign out',
	// 	label: 'Logout',
	// 	path: '/client/register',
	// 	icon: <HiOutlineLogout />
	// }
]
