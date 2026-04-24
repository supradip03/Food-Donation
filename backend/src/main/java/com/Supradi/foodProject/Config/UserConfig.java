package com.Supradi.foodProject.Config;

import com.Supradi.foodProject.Filter.JwtFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class UserConfig {

    private final JwtFilter jwtFilter;
    private final UserDetailsService userDetailsService;

    public UserConfig(JwtFilter jwtFilter, UserDetailsService userDetailsService) {
        this.jwtFilter = jwtFilter;
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public SecurityFilterChain secutiryFilterChain(HttpSecurity httpSecurity) {
        return httpSecurity
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/user/**").permitAll()
                        .requestMatchers("/food/addFood").hasAnyAuthority("SELF", "RESTAURANT")
                        .requestMatchers("/food/update/**").hasAnyAuthority("SELF", "RESTAURANT")
                        .requestMatchers("/food/remove/**").hasAnyAuthority("SELF", "RESTAURANT")
                        .requestMatchers("/food/userFoods").hasAnyAuthority("SELF", "RESTAURANT")
                        .requestMatchers("/food/get/*").hasAnyAuthority("SELF", "RESTAURANT")
                        .requestMatchers("/request/foodRequests").hasAnyAuthority("SELF", "RESTAURANT")
                        .requestMatchers("/request/accept/**").hasAnyAuthority("RESTAURANT", "SELF")
                        .requestMatchers("/request/complete/**").hasAnyAuthority("RESTAURANT", "SELF")

                        .requestMatchers("/request/myRequests").hasAuthority("NGO")
                        .requestMatchers("/request/*").hasAuthority("NGO")
                        .anyRequest().authenticated())
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder()); // or BCrypt
        return provider; // If all ok then return Authentication object
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
