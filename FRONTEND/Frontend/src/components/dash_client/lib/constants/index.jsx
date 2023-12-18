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

	{
		key: 'YourProfile',
		label: 'Your Profile',
		path: '/client/profile',
		icon: <HiOutlineDocumentText />
	},
	{
		key: 'messages',
		label: 'Messages',
		path: '/client/message',
		icon: <HiOutlineAnnotation />
	},
	{
		
	}

]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/*',
		icon: <HiOutlineCog />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '/*',
		icon: <HiOutlineQuestionMarkCircle />
	},
]
