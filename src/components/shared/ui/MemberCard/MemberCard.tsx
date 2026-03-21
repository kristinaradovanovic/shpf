import { TeamMemberSchemaType } from '@/schemas/teamMember/teamMember.types';
import { urlForImage } from '@lib/sanity/sanity.image';
import { LocationIcon } from '@/components/shared/ui/icons/LocationIcon';
import Image from 'next/image';
import * as styles from './MemberCard.css';

const MemberCard = ({
  image,
  nameAndLastName,
  jobTitle,
  hotel,
  location,
}: TeamMemberSchemaType) => {
  const imageUrl = image?.asset ? urlForImage(image.asset, 75).url() : null;

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={image?.alt ?? nameAndLastName}
            fill
            style={{ objectFit: 'cover' }}
            sizes="120px"
          />
        ) : (
          <div className={styles.imagePlaceholder} />
        )}
      </div>

      <div className={styles.nameContainer}>
        <span className={styles.name}>{nameAndLastName}</span>
        <span className={styles.jobTitle}>{jobTitle}</span>
      </div>

      <div className={styles.infoContainer}>
        <span className={styles.hotel}>{hotel}</span>
        <div className={styles.locationWrapper}>
          <LocationIcon className={styles.locationIcon} />
          <span className={styles.locationText}>{location}</span>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
