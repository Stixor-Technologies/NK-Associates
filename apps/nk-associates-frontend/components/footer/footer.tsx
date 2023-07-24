import React from "react";
import Image from "next/image";
import Link from "next/link";

import Logo from "../../../nk-associates-frontend/app/assets/images/nk-logo.svg";
import GooglePlay from "../../../nk-associates-frontend/app/assets/images/google-play.svg";
import AppStore from "../../../nk-associates-frontend/app/assets/images/app-store.svg";
import FB from "../../../nk-associates-frontend/app/assets/images/facebook-button.svg";
import Twitter from "../../../nk-associates-frontend/app/assets/images/twitter-button.svg";
import Instagram from "../../../nk-associates-frontend/app/assets/images/instagram-button.svg";
import Linkedin from "../../../nk-associates-frontend/app/assets/images/linkedin-button.svg";
import Snap from "../../../nk-associates-frontend/app/assets/images/snapchat-button.svg";
import YT from "../../../nk-associates-frontend/app/assets/images/youtube-button.svg";
import AppGallery from "../../../nk-associates-frontend/app/assets/images/app-gallery.svg";

// images have links in this page, including the logo.

// social media links have temp links that go to their respective homepage.
// I have written "dummy links here " in case you need to find them.

// all other links that go the NK associates site pages # has links.

const footer = () => {
	return (
		<footer className=" sm:min-h bg-nk-dark-gray font-metropolis dark:text-white ">
			<div className="container  mx-auto py-6 pb-2 lg:py-8 ">
				<div className="mx-5 sm:mx-auto ">
					<div className="md:flex md:justify-between">
						<div className="mb-2 sm:px-8 md:mb-0 md:px-16 ">
							<Link
								href="#"
								className="m-1 flex w-20 items-center pb-4  md:w-32 ">
								<Image src={Logo} alt="logo"></Image>
							</Link>
						</div>

						<div className="grid grid-cols-2 p-1  sm:m-1 sm:grid-cols-4  sm:gap-4 lg:px-16  xl:px-24 2xl:px-36">
							<div className="text-lg">
								<h2 className="mb-2  font-metropolis-bold text-base  tracking-widest dark:text-white	md:font-metropolis-medium ">
									COMPANY
								</h2>
								<div>
									<ul>
										<li className="mb-3">
											<Link href="#" className="  ">
												<div className="inline-block bg-gradient-to-r from-white to-white bg-[length:0%_8%] bg-left-bottom bg-no-repeat font-metropolis-light  transition-all duration-500 ease-out hover:bg-[length:100%_8%]   ">
													About
												</div>
											</Link>
										</li>
										<li className="mb-3">
											<Link href="#">
												<div className="inline-block bg-gradient-to-r from-white to-white bg-[length:0%_8%] bg-left-bottom bg-no-repeat font-metropolis-light  transition-all duration-500 ease-out hover:bg-[length:100%_8%]   ">
													Property
												</div>
											</Link>
										</li>
										<li className="mb-3">
											<Link href="#">
												<div className="inline-block bg-gradient-to-r from-white to-white bg-[length:0%_8%] bg-left-bottom bg-no-repeat font-metropolis-light  transition-all duration-500 ease-out hover:bg-[length:100%_8%]   ">
													Jobs
												</div>
											</Link>
										</li>
										<li className="mb-3">
											<Link href="#">
												<div className="inline-block bg-gradient-to-r from-white to-white bg-[length:0%_8%] bg-left-bottom bg-no-repeat font-metropolis-light  transition-all duration-500 ease-out hover:bg-[length:100%_8%]   ">
													Projects
												</div>
											</Link>
										</li>
										<li className="mb-3">
											<Link href="#">
												<div className="inline-block bg-gradient-to-r from-white to-white bg-[length:0%_8%] bg-left-bottom bg-no-repeat font-metropolis-light  transition-all duration-500 ease-out hover:bg-[length:100%_8%]   ">
													Maps
												</div>
											</Link>
										</li>
									</ul>
								</div>
							</div>

							{/* dummy links here */}

							<div>
								<div className=" md:hidden ">
									{/* responsive / mobile view elements */}
									<div className="">
										<h2 className="dark:text-medium mb-2 font-metropolis-bold text-base tracking-widest	">
											SOCIAL
										</h2>
										<div className="text-lg">
											<ul className="">
												<li className="mb-3">
													<Link
														href="https://www.facebook.com/"
														target="_blank">
														<div className="inline-block bg-gradient-to-r from-white to-white bg-[length:0%_8%] bg-left-bottom bg-no-repeat font-metropolis-light  transition-all duration-500 ease-out hover:bg-[length:100%_8%]   ">
															Facebook
														</div>
													</Link>
												</li>
												<li className="mb-3">
													<Link href="https://www.twitter.com/" target="_blank">
														<div className="inline-block bg-gradient-to-r from-white to-white bg-[length:0%_8%] bg-left-bottom bg-no-repeat font-metropolis-light  transition-all duration-500 ease-out hover:bg-[length:100%_8%]   ">
															Twitter
														</div>
													</Link>
												</li>
												<li className="mb-3">
													<Link
														href="https://www.instagram.com/"
														target="_blank">
														<div className="inline-block bg-gradient-to-r from-white to-white bg-[length:0%_8%] bg-left-bottom bg-no-repeat font-metropolis-light  transition-all duration-500 ease-out hover:bg-[length:100%_8%]   ">
															Instagram
														</div>
													</Link>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<h2 className="mb-2  font-metropolis-bold text-base tracking-widest dark:text-white md:font-metropolis-medium">
									SELL
								</h2>
								<ul className=" text-lg">
									<li className="mb-3">
										<Link href="#">
											<div className="inline-block bg-gradient-to-r from-white to-white bg-[length:0%_8%] bg-left-bottom bg-no-repeat font-metropolis-light  transition-all duration-500 ease-out hover:bg-[length:100%_8%]   ">
												Sell on NK
											</div>
										</Link>
									</li>
								</ul>
							</div>

							<div className="hidden font-metropolis-medium text-base md:block  ">
								<h2 className="mb-2  text-base  tracking-widest dark:text-white 	">
									DOWNLOAD
								</h2>
								<div>
									<ul className="">
										<li className="mb-3">
											<Link href="#">
												<Image
													src={GooglePlay}
													alt="Google Play"
													className=" w-32  object-cover transition duration-500 ease-in-out hover:translate-y-1 hover:opacity-90"></Image>
											</Link>
										</li>
										<li className="mb-3">
											<Link href="#">
												<Image
													src={AppStore}
													alt="Google Play"
													className=" w-32 object-cover transition duration-500 ease-in-out hover:translate-y-1 hover:opacity-90"></Image>
											</Link>
										</li>
									</ul>
								</div>
							</div>

							{/* dummy links here  */}
							<div className="hidden md:block ">
								<h2 className="mb-2  text-base tracking-widest dark:text-white md:font-metropolis-medium	">
									SOCIAL
								</h2>
								<div className="flex flex-wrap ">
									<Link
										href="https://www.facebook.com/"
										target="_blank"
										rel="noopener noreferrer"
										className="m-1 w-10 object-cover transition duration-500 ease-in-out hover:translate-y-1 hover:opacity-90 ">
										<Image src={FB} alt="Facebook" />
									</Link>
									<Link
										href="https://twitter.com/"
										target="_blank"
										rel="noopener noreferrer"
										className="m-1 w-10 object-cover transition duration-500 ease-in-out hover:translate-y-1 hover:opacity-90">
										<Image src={Twitter} alt="Twitter" />
									</Link>
									<Link
										href="https://www.instagram.com/"
										target="_blank"
										rel="noopener noreferrer"
										className="m-1 w-10 object-cover transition duration-500 ease-in-out hover:translate-y-1 hover:opacity-90">
										<Image src={Instagram} alt="Instagram" />
									</Link>
									<Link
										href="https://www.linkedin.com/"
										target="_blank"
										rel="noopener noreferrer"
										className="m-1 w-10 object-cover transition duration-500 ease-in-out hover:translate-y-1 hover:opacity-90">
										<Image src={Linkedin} alt="LinkedIn" />
									</Link>

									<Link
										href="https://www.snapchat.com/"
										target="_blank"
										rel="noopener noreferrer"
										className="m-1 w-10 object-cover transition duration-500 ease-in-out hover:translate-y-1 hover:opacity-90">
										<Image src={Snap} alt="Snapchat" />
									</Link>
									<Link
										href="https://www.youtube.com/"
										target="_blank"
										rel="noopener noreferrer"
										className="m-1 w-10 object-cover transition duration-500 ease-in-out hover:translate-y-1 hover:opacity-90">
										<Image src={YT} alt="YouTube" />
									</Link>
								</div>
							</div>
						</div>

						{/* Responsive  mobile view elements here */}
						<div className=" pt-4   sm:hidden">
							{/* here are the social media buttons with dummy links*/}
							<div className=" flex justify-center ">
								<Link
									href="https://www.facebook.com/"
									className="m-2 w-8 object-cover transition duration-500 ease-in-out hover:translate-y-1 hover:opacity-90  ">
									<Image src={FB} alt="Facebook" />
								</Link>
								<Link
									href="https://twitter.com/"
									className="m-2 w-8 object-cover transition duration-500 ease-in-out hover:translate-y-1 hover:opacity-90">
									<Image src={Twitter} alt="Twitter" />
								</Link>

								<Link
									href="https://www.instagram.com/"
									className="m-2 w-8 object-cover transition duration-500 ease-in-out hover:translate-y-1 hover:opacity-90">
									<Image src={Instagram} alt="Instagram" />
								</Link>

								<Link
									href="https://www.linkedin.com/"
									className="m-2 w-8 object-cover transition duration-500 ease-in-out hover:translate-y-1 hover:opacity-90">
									<Image src={Linkedin} alt="LinkedIn" />
								</Link>
								<Link
									href="https://www.snapchat.com/"
									className="m-2 w-8 object-cover transition duration-500 ease-in-out hover:translate-y-1 hover:opacity-90">
									<Image src={Snap} alt="Snapchat" />
								</Link>
								<Link
									href="https://www.youtube.com/"
									className="m-2 w-8 object-cover transition duration-500 ease-in-out hover:translate-y-1 hover:opacity-90">
									<Image src={YT} alt="YouTube" />
								</Link>
							</div>

							<div>
								<div className="text-base ">
									<h2 className="m-2 flex  justify-center  font-metropolis-medium text-sm tracking-widest dark:text-white	">
										DOWNLOAD
									</h2>
									<div className="flex justify-center ">
										<Link href="#" className="mx-2   ">
											<Image
												src={GooglePlay}
												alt="Google Play"
												className="object-cover transition duration-500 ease-in-out hover:translate-y-1 hover:opacity-90 md:w-44"></Image>
										</Link>

										<Link href="#" className="mx-2  ">
											<Image
												src={AppStore}
												alt="Google Play"
												className="hover:opacity-90md:w-44 object-cover transition duration-500 ease-in-out hover:translate-y-1"></Image>
										</Link>
									</div>
									<div className="flex justify-center">
										<Link href="#" className="m-3  ">
											<Image
												src={AppGallery}
												alt="App Gallery"
												className="object-cover transition duration-500 ease-in-out hover:translate-y-1 hover:opacity-90 md:w-44"></Image>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className=" container mx-auto font-metropolis-light">
				<hr className="border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-2" />

				<div className=" mx-auto flex flex-col justify-center gap-2 p-4 text-xs md:flex-row md:items-center md:justify-between md:text-lg lg:mx-24 lg:gap-8 lg:text-lg ">
					<span className=" text-center md:text-base  ">
						Copyright © 2023. All Rights Reserved on nkaccosiate.
					</span>

					<div className="mt-3 flex items-center justify-center gap-6 sm:mt-0  ">
						<Link
							href="#"
							className="  bg-gradient-to-r from-white to-white bg-[length:0%_8%] bg-left-bottom bg-no-repeat font-metropolis-light  transition-all duration-500 ease-out hover:bg-[length:100%_8%] lg:text-base">
							Terms of Use
						</Link>

						<Link
							href="#"
							className=" bg-gradient-to-r from-white to-white bg-[length:0%_8%] bg-left-bottom bg-no-repeat font-metropolis-light  transition-all duration-500 ease-out hover:bg-[length:100%_8%] lg:text-base">
							Privacy Policy
						</Link>

						<Link
							href="#"
							className="bg-gradient-to-r from-white to-white bg-[length:0%_8%] bg-left-bottom bg-no-repeat font-metropolis-light  transition-all duration-500 ease-out hover:bg-[length:100%_8%] lg:text-base">
							Site Map
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default footer;
