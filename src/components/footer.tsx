import { IWPMenuItem } from '@/interfaces/footerHeaderRestAPIDataResponse';
import Image from 'next/image';
import Link from 'next/link';
import logo from '/public/RDji_logo.svg';

export const Footer = ({
  footerItemsMenuLeft,
  footerItemsMenuRight,
  aboutCompanyInFooterBlock,
  copyright,
}: {
  footerItemsMenuLeft: IWPMenuItem[];
  footerItemsMenuRight: IWPMenuItem[];
  aboutCompanyInFooterBlock: string;
  copyright: string;
}) => {
  return (
    <footer
      id="#footer"
      className="bg-[#010101] pt-24 text-white text-opacity-70 sm:pt-40 lg:pt-[250px]"
    >
      <div className="h-[1px] w-full bg-[#242424]" />
      <div className="mx-auto mt-12 flex max-w-4xl flex-col items-center gap-10 sm:flex-row sm:justify-between sm:gap-5">
        <div className="flex flex-col gap-10">
          <Link href={'/'}>
            <Image
              src={logo}
              alt={'RDji_logo'}
              width={100}
              height={100}
              className="opacity-80 transition hover:opacity-100"
            />
          </Link>

          <p
            className="max-w-xs text-base font-normal uppercase"
            dangerouslySetInnerHTML={{
              __html:
                aboutCompanyInFooterBlock &&
                typeof aboutCompanyInFooterBlock === 'string'
                  ? aboutCompanyInFooterBlock
                  : null,
            }}
          />
        </div>
        <div className="">
          <menu className="flex flex-col items-center gap-4 sm:items-start">
            {footerItemsMenuLeft?.length !== 0
              ? footerItemsMenuLeft.map((item) => (
                  <li key={item.node.id} className="font-bold uppercase">
                    <Link href={item.node.uri}>{item.node.label}</Link>
                  </li>
                ))
              : null}
          </menu>
        </div>
        <div className="">
          <menu className="flex flex-col items-center gap-4 sm:items-start">
            {footerItemsMenuRight?.length !== 0
              ? footerItemsMenuRight.map((item) => (
                  <li key={item.node.id} className="font-bold uppercase">
                    <Link href={item.node.uri}>{item.node.label}</Link>
                  </li>
                ))
              : null}
          </menu>
        </div>
      </div>
      <p
        className="mt-12 pb-2 text-center"
        dangerouslySetInnerHTML={{
          __html: copyright && typeof copyright === 'string' ? copyright : null,
        }}
      />
    </footer>
  );
};
