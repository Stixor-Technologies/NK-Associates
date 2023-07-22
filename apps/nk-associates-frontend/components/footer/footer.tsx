import React from "react";
import Image from "next/image";
import Link from "next/link";

import Logo from "../../../nk-associates-frontend/app/assets/images/Layer_2.svg";
import GooglePlay from "../../../nk-associates-frontend/app/assets/images/Google_Play.svg";
import AppStore from "../../../nk-associates-frontend/app/assets/images/App_Store.svg";
import FB from "../../../nk-associates-frontend/app/assets/images/Button.svg";
import Twitter from "../../../nk-associates-frontend/app/assets/images/Button-1.svg";
import Instagram from "../../../nk-associates-frontend/app/assets/images/Button-2.svg";
import Linkedin from "../../../nk-associates-frontend/app/assets/images/Button-3.svg";
import Snap from "../../../nk-associates-frontend/app/assets/images/Button-4.svg";
import YT from "../../../nk-associates-frontend/app/assets/images/Button-5.svg";
import AppGallery from "../../../nk-associates-frontend/app/assets/images/App_Gallery.svg";

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
								<h2 className="mb-2  text-base  tracking-wider dark:text-white	 ">
									COMPANY
								</h2>
								<div>
									<ul className="">
										<li className="mb-3">
											<Link
												href="#"
												className="bg-gradient-to-r from-white to-white bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-500 ease-out hover:bg-[length:100%_2px]">
												About
											</Link>
										</li>
										<li className="mb-3">
											<Link
												href="#"
												className="bg-gradient-to-r from-white to-white bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-500 ease-out hover:bg-[length:100%_2px]">
												Property
											</Link>
										</li>
										<li className="mb-3">
											<Link
												href="#"
												className="bg-gradient-to-r from-white to-white bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-500 ease-out hover:bg-[length:100%_2px]">
												Jobs
											</Link>
										</li>
										<li className="mb-3">
											<Link
												href="#"
												className="bg-gradient-to-r from-white to-white bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-500 ease-out hover:bg-[length:100%_2px]">
												Projects
											</Link>
										</li>
										<li className="mb-3">
											<Link
												href="#"
												className="bg-gradient-to-r from-white to-white bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-500 ease-out hover:bg-[length:100%_2px]">
												Maps
											</Link>
										</li>
									</ul>
								</div>
							</div>

							{/* here */}

							<div>
								<div className=" md:hidden lg:hidden">
									{/* social added for responsive mobile view */}
									<div className="">
										<h2 className="mb-2  text-base  tracking-wider  dark:text-white	">
											SOCIAL
										</h2>
										<div className="text-lg">
											<ul className="">
												<li className="mb-3">
													<Link
														href="#"
														className="bg-gradient-to-r from-white to-white bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-500 ease-out hover:bg-[length:100%_2px]">
														Facebook
													</Link>
												</li>
												<li className="mb-3">
													<Link
														href="#"
														className="bg-gradient-to-r from-white to-white bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-500 ease-out hover:bg-[length:100%_2px]">
														Twitter
													</Link>
												</li>
												<li className="mb-3">
													<Link
														href="#"
														className="bg-gradient-to-r from-white to-white bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-500 ease-out hover:bg-[length:100%_2px]">
														Instagram
													</Link>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<h2 className="mb-2  text-base dark:text-white">SELL</h2>
								<ul className=" ">
									<li className="mb-3">
										<Link
											href="#"
											className="bg-gradient-to-r from-white to-white bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-500 ease-out hover:bg-[length:100%_2px]">
											Sell on NK
										</Link>
									</li>
								</ul>
							</div>

							<div className="hidden text-base md:block lg:block ">
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

							<div className="hidden md:block lg:block ">
								<h2 className="mb-2 text-base tracking-wider dark:text-white	">
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

									{/* dummy links here  */}
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
							{/* here are the m-1 media buttons with dummy links*/}
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
									<h2 className="m-2  flex  justify-center text-sm/[16px] tracking-widest dark:text-white	">
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
			<div className=" container mx-auto font-normal">
				<hr className="border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-2" />

				<div className=" mx-auto flex flex-col justify-center gap-8 p-4 sm:text-xs md:flex-row md:items-center md:justify-between lg:mx-24 lg:text-lg ">
					<span className=" text-center   ">
						Copyright © 2023. All Rights Reserved on nkaccosiate.
					</span>

					<div className="mt-3 flex items-center justify-center gap-3 sm:mt-0 ">
						<Link
							href="#"
							className=" relative ease-in-out after:absolute after:bottom-0 after:left-0 after:block after:h-px after:w-0 after:bg-white after:content-[''] hover:after:w-full hover:after:transition-all hover:after:duration-500 lg:text-lg">
							Terms of Use
						</Link>

						<Link
							href="#"
							className=" font-roboto relative ease-in-out after:absolute after:bottom-0 after:left-0 after:block after:h-px after:w-0 after:bg-white after:content-[''] hover:after:w-full hover:after:transition-all hover:after:duration-500 lg:text-lg">
							Privacy Policy
						</Link>

						<Link
							href="#"
							className=" font-roboto relative ease-in-out after:absolute after:bottom-0 after:left-0 after:block after:h-px after:w-0 after:bg-white after:content-[''] hover:after:w-full hover:after:transition-all hover:after:duration-500 lg:text-lg">
							Site Map
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default footer;
