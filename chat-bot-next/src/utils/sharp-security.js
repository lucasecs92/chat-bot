/**
 * Sharp Security Configuration
 * Blocks potentially unsafe operations on GIF, TIFF, and VIPS images
 * to mitigate vulnerabilities in libvips (CVE-2026-33327, CVE-2026-33328, CVE-2026-35590, CVE-2026-35591)
 */
import sharp from 'sharp';

sharp.block({ 
  operation: ["VipsForeignLoadNsgif", "VipsForeignLoadTiff", "VipsForeignLoadVips"] 
});

export default sharp;
