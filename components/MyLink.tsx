import { forwardRef, LegacyRef } from 'react'
import Link from 'next/link'

type Props = {
  href: string
  children: React.ReactNode
  className?: string
}

// @ref https://headlessui.dev/react/menu#integrating-with-next-js
// eslint-disable-next-line react/display-name
const MyLink = forwardRef(
  (props: Props, ref: LegacyRef<HTMLAnchorElement> | undefined) => {
    let { href, children, ...rest } = props
    return (
      <Link href={href}>
        <a ref={ref} {...rest}>
          {children}
        </a>
      </Link>
    )
  }
)

export default MyLink
