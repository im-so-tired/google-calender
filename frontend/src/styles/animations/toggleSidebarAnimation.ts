export const toggleSidebarAnimation: any = {
	entering: {
		transform: 'translateX(-256px)',
		gap: '0',
		width: 'calc(1920px + 256px)',
	},
	entered: { transform: 'translateX(0)', gap: '2rem', width: '1920px' },
	exiting: { transform: 'translateX(0)', gap: '2rem', width: '1920px' },
	exited: {
		transform: 'translateX(-256px)',
		gap: '0',
		width: 'calc(1920px + 256px)',
	},
}
