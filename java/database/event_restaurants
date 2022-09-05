-- Table: public.event_restaurants

-- DROP TABLE IF EXISTS public.event_restaurants;

CREATE TABLE IF NOT EXISTS public.event_restaurants
(
    event_id integer,
    restaurant_id character varying(22) COLLATE pg_catalog."default",
    up_votes integer,
    down_votes integer,
    CONSTRAINT event_id FOREIGN KEY (event_id)
        REFERENCES public.event (event_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "resturant_id " FOREIGN KEY (restaurant_id)
        REFERENCES public.restaurants (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.event_restaurants
    OWNER to postgres;