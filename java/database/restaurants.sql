-- Table: public.restaurants

-- DROP TABLE IF EXISTS public.restaurants;

CREATE TABLE IF NOT EXISTS public.restaurants
(
    id character varying(22) COLLATE pg_catalog."default" NOT NULL,
    alias character varying(51) COLLATE pg_catalog."default" NOT NULL,
    name character varying(43) COLLATE pg_catalog."default" NOT NULL,
    image_url character varying(68) COLLATE pg_catalog."default" NOT NULL,
    is_closed character varying(5) COLLATE pg_catalog."default" NOT NULL,
    url character varying(208) COLLATE pg_catalog."default" NOT NULL,
    review_count bigint NOT NULL,
    categories0alias character varying(16) COLLATE pg_catalog."default" NOT NULL,
    categories0title character varying(18) COLLATE pg_catalog."default" NOT NULL,
    categories1alias character varying(16) COLLATE pg_catalog."default",
    categories1title character varying(18) COLLATE pg_catalog."default",
    categories2alias character varying(16) COLLATE pg_catalog."default",
    categories2title character varying(22) COLLATE pg_catalog."default",
    rating numeric(3,1) NOT NULL,
    coordinateslatitude numeric(17,14) NOT NULL,
    coordinateslongitude numeric(18,14) NOT NULL,
    transactions0 character varying(22) COLLATE pg_catalog."default",
    transactions1 character varying(22) COLLATE pg_catalog."default",
    price character varying(4) COLLATE pg_catalog."default" NOT NULL,
    locationaddress1 character varying(17) COLLATE pg_catalog."default",
    locationaddress2 character varying(30) COLLATE pg_catalog."default",
    locationaddress3 character varying(30) COLLATE pg_catalog."default",
    locationcity character varying(8) COLLATE pg_catalog."default" NOT NULL,
    locationzip_code bigint NOT NULL,
    locationcountry character varying(2) COLLATE pg_catalog."default" NOT NULL,
    locationstate character varying(2) COLLATE pg_catalog."default" NOT NULL,
    locationdisplay_address0 character varying(18) COLLATE pg_catalog."default" NOT NULL,
    locationdisplay_address1 character varying(20) COLLATE pg_catalog."default",
    phone bigint,
    display_phone character varying(14) COLLATE pg_catalog."default",
    distance numeric(18,14) NOT NULL,
    transactions2 character varying(8) COLLATE pg_catalog."default",
    locationdisplay_address2 character varying(20) COLLATE pg_catalog."default",
    CONSTRAINT restaurants_pkey PRIMARY KEY (id)
)


TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.restaurants
    OWNER to postgres;