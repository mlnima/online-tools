import {FC} from "react";
import Link from "next/link";
import Image from 'next/image'
import styles from "./Logo.module.scss";

interface IProps {
}

const Logo: FC<IProps> = ({}) => {
    return (
        <span className={styles.logo}>
            <Link href="/" aria-label="Go to Home Page" title="Go to Home Page">

              <Image
                  src="/logo.png"
                  width={50}
                  height={50}
                  alt="Picture of the author"
              />
                <span className={styles.web}>Web</span>
                <span className={styles.wizKit}>WizKit</span>
            </Link>
          </span>
    )
};
export default Logo
