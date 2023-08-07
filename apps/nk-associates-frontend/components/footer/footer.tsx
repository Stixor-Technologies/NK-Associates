import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/assets/icons/nk-logo.svg";
import GooglePlay from "../../public/assets/icons/google-play.svg";
import AppStore from "../../public/assets/icons/app-store.svg";
import FB from "../../public/assets/icons/facebook-icon.svg";
import Twitter from "../../public/assets/icons/twitter-icon.svg";
import Instagram from "../../public/assets/icons/instagram-icon.svg";
import Linkedin from "../../public/assets/icons/linkedIn-icon.svg";
import Snap from "../../public/assets/icons/snapchat-icon.svg";
import YT from "../../public/assets/icons/youtube-icon.svg";
import AppGallery from "../../public/assets/icons/app-gallery.svg";

// social media links have temp links that go to their respective homepage.
// I have written "dummy links here" in case you need to find them.
const footer = () => {
  return (
		<footer className="min-h-fit bg-nk-dark-gray font-metropolis text-nk-white">
			<div className="container mx-auto py-6 pb-2 lg:py-8">
				<div className="mx-5 sm:mx-2 md:mx-auto">
					<div className="md:flex md:justify-between">
						<div className="mb-2 md:mb-0 md:px-8 lg:px-16">
							<Link
								href="#"
								className="m-1 flex w-20 items-center pb-4 md:w-32">
								<Image src={Logo} alt="logo" />
							</Link>
						</div>
						<div className="grid grid-cols-2 sm:m-1 sm:gap-8 md:grid-cols-4 md:gap-4 lg:px-16 xl:px-24 2xl:px-36">
							<div className="text-lg">
								<h2 className="mb-2 font-metropolis-bold text-base uppercase tracking-[0.2rem] text-nk-white	md:font-metropolis-medium">
									company
								</h2>
								<ul>
									<li className="mb-3">
										<Link
											href="#"
											className="inline-block bg-gradient-to-r from-nk-white to-nk-white bg-[length:0%_8%] bg-left-bottom bg-no-repeat font-metropolis-thin transition-all duration-500 ease-out hover:bg-[length:100%_8%]">
											About
										</Link>
									</li>
									<li className="mb-3">
										<Link
											href="/properties"
											className="inline-block bg-gradient-to-r from-nk-white to-nk-white bg-[length:0%_8%] bg-left-bottom bg-no-repeat font-metropolis-thin transition-all duration-500 ease-out hover:bg-[length:100%_8%]">
											Property
										</Link>
									</li>
									<li className="mb-3">
										<Link
											href="#"
											className="inline-block bg-gradient-to-r from-nk-white to-nk-white bg-[length:0%_8%] bg-left-bottom bg-no-repeat font-metropolis-thin transition-all duration-500 ease-out hover:bg-[length:100%_8%]">
											Jobs
										</Link>
									</li>
									<li className="mb-3">
										<Link
											href="/projects"
											className="inline-block bg-gradient-to-r from-nk-white to-nk-white bg-[length:0%_8%] bg-left-bottom bg-no-repeat font-metropolis-thin transition-all duration-500 ease-out hover:bg-[length:100%_8%]">
											Projects
										</Link>
									</li>
									<li>
										<Link
											href="#"
											className="inline-block bg-gradient-to-r from-nk-white to-nk-white bg-[length:0%_8%] bg-left-bottom bg-no-repeat font-metropolis-thin transition-all duration-500 ease-out hover:bg-[length:100%_8%]">
											Maps
										</Link>
									</li>
								</ul>
							</div>
							<div>
								<div className=" sm:pt-0">
									<h2 className="mb-2 font-metropolis-bold text-base uppercase tracking-[0.2rem] text-nk-white md:font-metropolis-medium">
										‎
									</h2>
									<ul className="text-lg">
										<li className="mb-3">
											<Link
												href="/careers"
												className="inline-block bg-gradient-to-r from-nk-white to-nk-white bg-[length:0%_8%] bg-left-bottom bg-no-repeat font-metropolis-thin transition-all duration-500 ease-out hover:bg-[length:100%_8%]">
												Career
											</Link>
										</li>
										<li className="mb-3">
											<Link
												href="/events"
												className="inline-block bg-gradient-to-r from-nk-white to-nk-white bg-[length:0%_8%] bg-left-bottom bg-no-repeat font-metropolis-thin transition-all duration-500 ease-out hover:bg-[length:100%_8%]">
												Events
											</Link>
										</li>
									</ul>
									<div className="pt-4 md:hidden">
										{/* dummy links here*/}
										<div className="flex flex-wrap">
											<div className="my-2 mr-3 flex h-9 w-9 items-center justify-center rounded-full bg-nk-red transition-all duration-300 hover:bg-opacity-75">
												<Link
													href="https://www.facebook.com/NKAssociatesOfficial/"
													target="_blank"
													rel="noopener noreferrer">
													<Image src={FB} alt="Facebook" />
												</Link>
											</div>
											<div className="my-2 mr-3 flex h-9 w-9 items-center justify-center rounded-full bg-nk-red transition-all duration-300 hover:bg-opacity-75">
												<Link
													href="https://twitter.com/NKAssociates6"
													target="_blank"
													rel="noopener noreferrer">
													<Image src={Twitter} alt="Twitter" />
												</Link>
											</div>
											<div className="my-2 mr-3 flex h-9 w-9 items-center justify-center rounded-full bg-nk-red transition-all duration-300 hover:bg-opacity-75">
												<Link
													href="https://www.instagram.com/nkassociatespvtltd/"
													target="_blank"
													rel="noopener noreferrer">
													<Image src={Instagram} alt="Instagram" />
												</Link>
											</div>
											<div className="my-2 mr-3 flex h-9 w-9 items-center justify-center rounded-full bg-nk-red transition-all duration-300 hover:bg-opacity-75">
												<Link
													href="https://www.linkedin.com/uas/login?session_redirect=%2Fcompany%2F47665410"
													target="_blank"
													rel="noopener noreferrer">
													<Image src={Linkedin} alt="LinkedIn" />
												</Link>
											</div>
											<div className="my-2 mr-3 flex h-9 w-9 items-center justify-center rounded-full bg-nk-red transition-all duration-300 hover:bg-opacity-75">
												<Link
													href="https://www.snapchat.com/"
													target="_blank"
													rel="noopener noreferrer">
													<Image src={Snap} alt="Snapchat" />
												</Link>
											</div>

											<div className="my-2 mr-3 flex h-9 w-9 items-center justify-center rounded-full bg-nk-red transition-all duration-300 hover:bg-opacity-75">
												<Link
													href="https://www.youtube.com/channel/UCUdSaD4ZjxDYxXiQXZIM7tw"
													target="_blank"
													rel="noopener noreferrer">
													<Image src={YT} alt="YouTube" />
												</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="hidden font-metropolis-medium text-base md:block">
								<h2 className="mb-3 text-base uppercase tracking-[0.2rem] text-nk-white 	">
									download
								</h2>
								<div>
									<ul>
										<li className="mb-5">
											<div className="flex h-10 items-center justify-center rounded-md bg-nk-red transition-all duration-300 hover:bg-opacity-75 lg:w-32 xl:h-12 xl:w-40">
												<Link href="#">
													<Image
														src={GooglePlay}
														alt="Google Play"
														className="p-4"
													/>
												</Link>
											</div>
										</li>
										<li className="mb-3">
											<div className="flex h-10 items-center justify-center rounded-md bg-nk-red transition-all duration-300 hover:bg-opacity-75 lg:w-32 xl:h-12 xl:w-40">
												<Link href="#">
													<Image
														src={AppStore}
														alt="App Store"
														className="p-4"
													/>
												</Link>
											</div>
										</li>
									</ul>
								</div>
							</div>
							{/* dummy links here */}
							<div className="hidden md:block">
								<h2 className="mb-1 text-base uppercase tracking-[0.2rem] text-nk-white md:font-metropolis-medium	">
									social
								</h2>
								<div className="flex flex-wrap">
									<Link
										href="https://www.facebook.com/NKAssociatesOfficial/"
										target="_blank"
										rel="noopener noreferrer">
										<div className="my-1 mr-3 flex h-9 w-9 items-center justify-center rounded-full bg-nk-red transition-all duration-300 hover:bg-opacity-75">
											<Image src={FB} alt="Facebook" />
										</div>
									</Link>
									<Link
										href="https://twitter.com/NKAssociates6"
										target="_blank"
										rel="noopener noreferrer">
										<div className="my-1 mr-3 flex h-9 w-9 items-center justify-center rounded-full bg-nk-red transition-all duration-300 hover:bg-opacity-75">
											<Image src={Twitter} alt="Twitter" />
										</div>
									</Link>
									<Link
										href="https://www.instagram.com/nkassociatespvtltd/"
										target="_blank"
										rel="noopener noreferrer">
										<div className="my-1 mr-3 flex h-9 w-9 items-center justify-center rounded-full bg-nk-red transition-all duration-300 hover:bg-opacity-75">
											<Image src={Instagram} alt="Instagram" />
										</div>
									</Link>
									<Link
										href="https://www.linkedin.com/uas/login?session_redirect=%2Fcompany%2F47665410"
										target="_blank"
										rel="noopener noreferrer">
										<div className="my-1 mr-3 flex h-9 w-9 items-center justify-center rounded-full bg-nk-red transition-all duration-300 hover:bg-opacity-75">
											<Image src={Linkedin} alt="LinkedIn" />
										</div>
									</Link>
									<Link
										href="https://www.snapchat.com/"
										target="_blank"
										rel="noopener noreferrer">
										<div className="my-1 mr-3 flex h-9 w-9 items-center justify-center rounded-full bg-nk-red transition-all duration-300 hover:bg-opacity-75">
											<Image src={Snap} alt="Snapchat" />
										</div>
									</Link>
									<Link
										href="https://www.youtube.com/channel/UCUdSaD4ZjxDYxXiQXZIM7tw"
										target="_blank"
										rel="noopener noreferrer">
										<div className="my-1 mr-3 flex h-9 w-9 items-center justify-center rounded-full bg-nk-red transition-all duration-300 hover:bg-opacity-75">
											<Image src={YT} alt="YouTube" />
										</div>
									</Link>
								</div>
							</div>
						</div>
						{/* Responsive mobile view elements here */}
						<div className="md:hidden">
							<div>
								<div className="text-base">
									<h2 className="m-4 flex justify-center font-metropolis-medium text-sm uppercase tracking-[0.2rem] text-nk-white	">
										download
									</h2>
									<div className="flex justify-center">
										<div className="mx-2 flex h-12 w-40 p-2 lg:w-44 items-center justify-center rounded-md bg-nk-red object-cover transition-all duration-500 hover:opacity-80">
											<Link href="#">
												<Image src={GooglePlay} alt="Google Play" />
											</Link>
										</div>
										<div className="mx-2 flex h-12 w-40 p-2 lg:w-44 items-center justify-center rounded-md bg-nk-red object-cover transition-all duration-300 hover:bg-opacity-75">
											<Link href="#" className="mx-2">
												<Image
													src={AppStore}
													alt="App Store"
												/>
											</Link>
										</div>
									</div>
									<div className="flex justify-center">
										<div className="m-4 flex h-12 w-40 p-2 lg:w-44 items-center justify-center rounded-md bg-nk-red object-cover transition-all duration-300 hover:bg-opacity-75">
											<Link href="#">
												<Image src={AppGallery} alt="App Gallery" />
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<hr className="border-nk-white sm:mx-auto lg:my-2" />
			<div className="container mx-auto font-metropolis-thin">
				<div className="mx-auto flex flex-col justify-center gap-2 p-4 text-xs md:flex-row md:items-center md:justify-between md:text-lg lg:mx-24 lg:gap-8 lg:text-lg">
					<span className="text-center md:text-base">
						Copyright © 2023. All Rights Reserved on nkaccosiate.
					</span>
					<div className="mt-3 flex items-center justify-center gap-6 sm:mt-0">
						<Link
							href="#"
							className="bg-gradient-to-r from-nk-white to-nk-white bg-[length:0%_8%] bg-left-bottom bg-no-repeat font-metropolis-thin transition-all duration-500 ease-out hover:bg-[length:100%_8%] lg:text-base">
							Terms of Use
						</Link>
						<Link
							href="#"
							className="bg-gradient-to-r from-nk-white to-nk-white bg-[length:0%_8%] bg-left-bottom bg-no-repeat font-metropolis-thin transition-all duration-500 ease-out hover:bg-[length:100%_8%] lg:text-base">
							Privacy Policy
						</Link>
						<Link
							href="#"
							className="bg-gradient-to-r from-nk-white to-nk-white bg-[length:0%_8%] bg-left-bottom bg-no-repeat font-metropolis-thin transition-all duration-500 ease-out hover:bg-[length:100%_8%] lg:text-base">
							Site Map
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default footer;
