export const toggleSidebarAnimation: any = {
	entering: {
		transform: 'translateX(-256px)',
		width: 'calc(1920px + 256px)',
	},
	entered: { transform: 'translateX(0)', width: '1920px' },
	exiting: { transform: 'translateX(0)', width: '1920px' },
	exited: {
		transform: 'translateX(-256px)',
		width: 'calc(1920px + 256px)',
	},
}
