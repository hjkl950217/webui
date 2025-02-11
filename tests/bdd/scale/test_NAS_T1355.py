# coding=utf-8
"""SCALE UI: feature tests."""

import time
from function import (
    wait_on_element,
    is_element_present,
    attribute_value_exist,
    wait_on_element_disappear,
)
from pytest_bdd import (
    given,
    scenario,
    then,
    when,
    parsers
)


@scenario('features/NAS-T1355.feature', 'Apps Page - Validate removing an app')
def test_apps_page__validate_removing_an_app():
    """Apps Page - Validate removing an app."""


@given('the browser is open, navigate to the SCALE URL, and login')
def the_browser_is_open_navigate_to_the_scale_url_and_login(driver, nas_ip, root_password):
    """the browser is open, navigate to the SCALE URL, and login."""
    if nas_ip not in driver.current_url:
        driver.get(f"http://{nas_ip}")
        assert wait_on_element(driver, 10, '//input[@data-placeholder="Username"]')
    if not is_element_present(driver, '//mat-list-item[@ix-auto="option__Dashboard"]'):
        assert wait_on_element(driver, 10, '//input[@data-placeholder="Username"]')
        driver.find_element_by_xpath('//input[@data-placeholder="Username"]').clear()
        driver.find_element_by_xpath('//input[@data-placeholder="Username"]').send_keys('root')
        driver.find_element_by_xpath('//input[@data-placeholder="Password"]').clear()
        driver.find_element_by_xpath('//input[@data-placeholder="Password"]').send_keys(root_password)
        assert wait_on_element(driver, 5, '//button[@name="signin_button"]')
        driver.find_element_by_xpath('//button[@name="signin_button"]').click()
    else:
        assert wait_on_element(driver, 5, '//mat-list-item[@ix-auto="option__Dashboard"]', 'clickable')
        driver.find_element_by_xpath('//mat-list-item[@ix-auto="option__Dashboard"]').click()


@when('on the Dashboard, click on apps')
def on_the_dashboard_click_on_apps(driver):
    """on the Dashboard, click on apps."""
    assert wait_on_element(driver, 10, '//span[contains(.,"Dashboard")]')
    assert wait_on_element(driver, 10, '//mat-list-item[@ix-auto="option__Apps"]', 'clickable')
    driver.find_element_by_xpath('//mat-list-item[@ix-auto="option__Apps"]').click()


@then('make sure the installed tab is open')
def make_sure_the_installed_tab_is_open(driver):
    """make sure the installed tab is open."""
    if is_element_present(driver, '//mat-ink-bar[@style="visibility: visible; left: 0px; width: 183px;"]') is False:
        assert wait_on_element(driver, 10, '//div[contains(text(),"Installed Applications")]', 'clickable')
        driver.find_element_by_xpath('//div[contains(text(),"Installed Applications")]').click()


@then('click three dots icon for Chia and select delete')
def click_three_dots_icon_for_chia_and_select_delete(driver):
    """click three dots icon for Chia and select delete."""
    assert wait_on_element(driver, 20, '//mat-card[contains(.,"chia-test")]//mat-icon[contains(.,"more_vert")]', 'clickable')
    driver.find_element_by_xpath('//mat-card[contains(.,"chia-test")]//mat-icon[contains(.,"more_vert")]').click()
    assert wait_on_element(driver, 10, '//span[contains(.,"Delete")]', 'clickable')
    driver.find_element_by_xpath('//span[contains(.,"Delete")]').click()



@then('confirm the delete confirmation')
def confirm_the_delete_confirmation(driver):
    """confirm the delete confirmation."""
    assert wait_on_element(driver, 5, '//h1[contains(.,"Delete")]')
    assert wait_on_element(driver, 2, '//mat-checkbox[@ix-auto="checkbox__CONFIRM"]', 'clickable')
    driver.find_element_by_xpath('//mat-checkbox[@ix-auto="checkbox__CONFIRM"]').click()
    assert wait_on_element(driver, 10, '//button[@ix-auto="button__CONTINUE"]', 'clickable')
    driver.find_element_by_xpath('//button[@ix-auto="button__CONTINUE"]').click()
    assert wait_on_element(driver, 5, '//*[contains(.,"Deleting...")]')
    assert wait_on_element_disappear(driver, 60, '//*[contains(.,"Deleting...")]')

@then('confirm deletion is successful')
def confirm_deletion_is_successful(driver):
    """confirm deletion is successful."""
    assert wait_on_element(driver, 20, '//mat-card[contains(.,"chia-test")]') is False