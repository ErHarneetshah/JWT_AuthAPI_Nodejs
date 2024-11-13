class starterTemplateClass {
  static userTable = `
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    mobile_no VARCHAR(255) NOT NULL,
    status BOOLEAN NOT NULL DEFAULT 1 COMMENT '0 for in-active, 1 for active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  `;

  static accessTokenTable = `id INT NOT NULL AUTO_INCREMENT,
    accessToken VARCHAR(500) NOT NULL UNIQUE,
    expireDate VARCHAR(100) NOT NULL,
    expireDateInString VARCHAR(255) NOT NULL,
    status BOOLEAN NOT NULL DEFAULT 1 COMMENT '0 for expired, 1 for working',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)`;

//   static shortJwtTokenExp = Math.floor(Date.now() / 1000) + (60 * 60); // short term token of 1 hr

//   static longJwtTokenExp = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30); // long term token of 30 days

  static template = [
    { name: "users", schema: starterTemplateClass.userTable },
    { name: "accessToken", schema: starterTemplateClass.accessTokenTable }
  ];
}

export default starterTemplateClass;
