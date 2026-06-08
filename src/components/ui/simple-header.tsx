import React, { lazy, Suspense, useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetFooter } from '@/components/ui/sheet';
import { Button, buttonVariants } from '@/components/ui/button';
import { MenuToggle } from '@/components/ui/menu-toggle';
import AdibuzLogo from '../AdibuzLogo';
import MagneticButton from '../MagneticButton';
import { cn } from '@/lib/utils';

const GetStartedModal = lazy(() =>
	import('@/components/funnels/GetStartedModal').then((m) => ({ default: m.GetStartedModal }))
);

function LazyGetStartedTrigger({ children }: { children: React.ReactNode }) {
	const [shouldLoad, setShouldLoad] = useState(false);
	const [openSignal, setOpenSignal] = useState(0);

	const open = () => {
		setShouldLoad(true);
		setOpenSignal((value) => value + 1);
	};

	if (!shouldLoad) {
		return (
			<span onClick={open} style={{ display: 'contents' }}>
				{children}
			</span>
		);
	}

	return (
		<Suspense fallback={<span style={{ display: 'contents' }}>{children}</span>}>
			<GetStartedModal openSignal={openSignal}>{children}</GetStartedModal>
		</Suspense>
	);
}

export function SimpleHeader({ dark = false }: { dark?: boolean }) {
	const [open, setOpen] = React.useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 20);
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const navItems = [
		{ label: 'Home', id: 'home', path: '/' },
		{ label: 'Services', id: 'services', path: '/#services' },
		{ label: 'Clients', id: 'clients', path: '/#clients' },
		{ label: 'Work', id: 'work', path: '/work' },
		{ label: 'Insights', id: 'insights', path: '/insights' },
		{ label: 'About', id: 'about', path: '/about' }
	];

	const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
		if (window.location.pathname !== '/') return;
		e.preventDefault();
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
			window.history.pushState(null, '', `#${id}`);
		}
		setOpen(false);
	};

	return (
		<header 
			className={cn(
				"adibuz-header fixed top-0 left-0 right-0 z-[1000] transition-all duration-500",
				isScrolled ? "py-4" : "py-6"
			)}
		>
			<nav className="container-custom flex justify-center" role="navigation" aria-label="Main navigation">
				<div 
					className={cn(
						"flex items-center justify-between transition-all duration-500 w-full",
						isScrolled 
							? dark 
								? "bg-black/90 backdrop-blur-md border border-white/10 rounded-[16px] px-6 sm:px-8 py-3 shadow-lg max-w-[1060px]"
								: "bg-white/86 backdrop-blur-xl border border-[rgba(58,15,99,0.12)] rounded-[18px] px-5 sm:px-7 py-3 shadow-[0_18px_50px_rgba(22,8,43,0.08)] max-w-[1060px]"
							: "py-2 px-2 max-w-7xl"
					)}
				>
					<Link to="/" className="flex items-center group cursor-pointer">
						<AdibuzLogo height={isScrolled ? 36 : 44} className={cn("transition-all duration-500 group-hover:scale-[1.02]", dark && "brightness-0 invert")} />
					</Link>

					<div className="hidden lg:flex items-center gap-6 xl:gap-10">
						{navItems.map((item) => {
							const isHash = item.path?.includes('#');
							const isActive = window.location.pathname === item.path || (window.location.pathname === '/' && item.id === 'home');
							
							return item.path && !isHash ? (
								<Link 
									key={item.label} 
									to={item.path}
									aria-current={isActive ? 'page' : undefined}
									className={cn(
										"relative text-[13px] font-bold transition-colors tracking-wide group pb-1",
										dark 
											? isActive ? "text-purple-400" : "text-slate-400 hover:text-white"
											: isActive ? "text-[#12091f]" : "text-[#6f667d] hover:text-[#12091f]"
									)}
								>
									{item.label}
									<div className={cn("absolute -bottom-[6px] left-0 w-full h-[3px] rounded-full origin-center transition-transform duration-300 scale-x-0 group-hover:scale-x-100", dark ? "bg-purple-400" : "bg-primary")} />
								</Link>
							) : (
								<a 
									key={item.label} 
									href={item.path}
									aria-current={isActive ? 'page' : undefined}
									onClick={(e) => handleScrollTo(e, item.id)}
									className={cn(
										"relative text-[13px] font-bold transition-colors tracking-wide group pb-1",
										dark 
											? isActive ? "text-purple-400" : "text-slate-400 hover:text-white"
											: isActive ? "text-[#12091f]" : "text-[#6f667d] hover:text-[#12091f]"
									)}
								>
									{item.label}
									<div className={cn("absolute -bottom-[6px] left-0 w-full h-[3px] rounded-full origin-center transition-transform duration-300 scale-x-0 group-hover:scale-x-100", dark ? "bg-purple-400" : "bg-primary")} />
								</a>
							);
						})}
					</div>

					<div className="flex items-center gap-4 lg:gap-6">
						<div className="hidden sm:flex items-center gap-4 lg:gap-6">
							<MagneticButton>
								<a 
									href="/contact"
									data-cursor-text="Contact"
									className={cn(
										"text-[13px] font-bold transition-opacity",
										dark ? "text-slate-300 hover:text-white" : "text-[#12091f] hover:text-primary"
									)}
								>
									Contact
								</a>
							</MagneticButton>
							<MagneticButton>
								<LazyGetStartedTrigger>
									<button 
										data-cursor-text="Join"
										aria-label="Get started with Adibuz"
										className={cn(
											"px-6 py-2.5 rounded-full text-[13px] font-bold transition-all",
											dark 
												? "bg-[#3A0F63] text-white hover:bg-purple-900 border border-purple-500/30 shadow-[0_0_20px_rgba(58,15,99,0.5)]"
												: "adibuz-button-primary px-6 py-2.5"
										)}
									>
										Get Started
									</button>
								</LazyGetStartedTrigger>
							</MagneticButton>
						</div>

						<Sheet open={open} onOpenChange={setOpen}>
							<Button 
								size="icon" 
								variant="ghost" 
								aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
								aria-expanded={open}
								aria-controls="mobile-nav"
								className={cn("lg:hidden p-2 hover:bg-transparent min-h-[44px] min-w-[44px]", dark ? "text-slate-300" : "text-slate-600")}>
								<MenuToggle
									strokeWidth={2.5}
									open={open}
									onOpenChange={setOpen}
									className="size-6"
								/>
							</Button>
							<SheetContent
								className="w-[min(420px,calc(100vw-24px))] max-w-none bg-[#fffdf8]/98 supports-[backdrop-filter]:bg-[#fffdf8]/94 gap-0 backdrop-blur-xl border-r-0 sm:border-r border-[rgba(58,15,99,0.12)] rounded-r-[28px] overflow-hidden"
								showClose={false}
								side="left"
							>
								<div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-[rgba(58,15,99,0.10)] shrink-0">
									<AdibuzLogo height={44} className={cn(dark && "brightness-0 invert")} />
									<button
										type="button"
										aria-label="Close navigation menu"
										onClick={() => setOpen(false)}
										className="h-11 w-11 rounded-full bg-white/80 border border-[rgba(58,15,99,0.12)] text-[#50627a] flex items-center justify-center shadow-sm"
									>
										<span className="text-2xl leading-none">&times;</span>
									</button>
								</div>
								<div id="mobile-nav" className="flex-1 overflow-y-auto px-6 py-8">
									<div className="flex flex-col gap-y-3">
										{navItems.map((item) => (
											item.path && !item.path.includes('#') ? (
												<Link
													key={item.label}
													to={item.path}
													className="text-xl sm:text-2xl font-bold text-[#12091f] hover:text-primary transition-colors py-2.5 min-h-[48px] flex items-center"
													onClick={() => setOpen(false)}
												>
													{item.label}
												</Link>
											) : (
												<a
													key={item.label}
													href={item.path}
													className="text-xl sm:text-2xl font-bold text-[#12091f] hover:text-primary transition-colors py-2.5 min-h-[48px] flex items-center"
													onClick={(e) => handleScrollTo(e, item.id)}
												>
													{item.label}
												</a>
											)
										))}
									</div>
								</div>
								<SheetFooter className="flex flex-col gap-4 p-6 bg-white/80 border-t border-[rgba(58,15,99,0.12)] mt-0 shrink-0">
									<Button 
										variant="outline" 
										className="w-full rounded-2xl py-6 font-bold text-lg border-[rgba(58,15,99,0.14)]"
										onClick={() => setOpen(false)}
										asChild
									>
										<a href="/contact">Contact</a>
									</Button>
									<Button 
										className="w-full adibuz-button-primary rounded-2xl py-6 font-bold text-lg shadow-lg"
										onClick={() => setOpen(false)}
									>
										Get Started
									</Button>
								</SheetFooter>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</nav>
		</header>
	);
}
